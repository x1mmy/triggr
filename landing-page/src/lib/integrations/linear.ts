import type { OnboardingPayload } from '@/lib/onboarding/schemas';
import { buildOnboardingSummary, serviceLabelForPayload } from '@/lib/onboarding/summary';

function getEnv(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

/** Pulls dashed UUID from a string (URL, pasted id, etc.). */
function extractLinearUuid(s: string | undefined): string | undefined {
  if (!s) return undefined;
  const m = s.trim().split('?')[0].split('#')[0].match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
  return m?.[1];
}

/** From env or pasted link: last segment after /project/ or whole slug. */
function normalizeProjectSlugInput(raw: string): string {
  let s = raw.trim().split('?')[0].split('#')[0].trim();
  try {
    if (s.includes('linear.app')) {
      const u = new URL(s.startsWith('http') ? s : `https://${s}`);
      const parts = u.pathname.split('/').filter(Boolean);
      const pi = parts.indexOf('project');
      if (pi >= 0 && parts[pi + 1]) {
        return parts[pi + 1];
      }
    }
  } catch {
    /* not a URL */
  }
  return s;
}

function projectBelongsToTeam(
  teamUuid: string,
  teams: { nodes: { id: string }[] } | null | undefined,
  trustIfUnspecified: boolean,
): boolean {
  if (!teams?.nodes?.length) {
    return trustIfUnspecified;
  }
  return teams.nodes.some((t) => t.id === teamUuid);
}

function normalizeApiKey(raw: string): string {
  return raw.replace(/^Bearer\s+/i, '').trim();
}

type LinearGqlResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

async function linearRequest<T>(
  apiKeyRaw: string,
  query: string,
  variables?: Record<string, unknown>,
): Promise<{ status: number } & LinearGqlResponse<T>> {
  const key = normalizeApiKey(apiKeyRaw);
  const body = JSON.stringify(variables ? { query, variables } : { query });
  const doFetch = (authValue: string) =>
    fetch('https://api.linear.app/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: authValue },
      body,
    });

  let res = await doFetch(key);
  if (res.status === 401) {
    res = await doFetch(`Bearer ${key}`);
  }

  let parsed: LinearGqlResponse<T>;
  try {
    parsed = (await res.json()) as LinearGqlResponse<T>;
  } catch {
    parsed = {};
  }
  return { status: res.status, ...parsed };
}

type IssueCreateData = {
  issueCreate?: {
    success?: boolean;
    issue?: { url?: string; project?: { id: string; name: string } | null };
  };
};

function resultFromIssueCreate(
  status: number,
  data: IssueCreateData | undefined,
  errors: { message: string }[] | undefined,
): { ok: true; url?: string } | { ok: false; error: string } {
  if (status < 200 || status >= 300) {
    return { ok: false, error: `Linear HTTP ${status}` };
  }
  if (errors?.length) {
    return { ok: false, error: errors.map((e) => e.message).join('; ') };
  }
  const success = data?.issueCreate?.success;
  if (!success) {
    const detail = JSON.stringify(data?.issueCreate ?? {}).slice(0, 600);
    return { ok: false, error: `Linear issueCreate was not successful. ${detail}` };
  }
  return { ok: true, url: data?.issueCreate?.issue?.url };
}

const CREATE_ISSUE_QUERY = `
  mutation CreateIssue($input: IssueCreateInput!) {
    issueCreate(input: $input) {
      success
      issue {
        id
        identifier
        url
        project {
          id
          name
        }
      }
    }
  }
`;

async function resolveTeamUuid(apiKey: string, configured: string): Promise<{ ok: true; teamId: string } | { ok: false; error: string }> {
  const fromEnv = extractLinearUuid(configured);
  if (fromEnv) {
    return { ok: true, teamId: fromEnv };
  }

  const wantKey = configured.trim().toUpperCase();
  const { status, data, errors } = await linearRequest<{ teams: { nodes: { id: string; key: string }[] } }>(
    apiKey,
    `query { teams { nodes { id key } } }`,
  );

  if (status < 200 || status >= 300) {
    return { ok: false, error: `Linear HTTP ${status} (teams query)` };
  }
  if (errors?.length) {
    return { ok: false, error: errors.map((e) => e.message).join('; ') };
  }

  const node = data?.teams?.nodes.find((n) => n.key.toUpperCase() === wantKey);
  if (!node) {
    return {
      ok: false,
      error: `No team with key "${configured.trim()}". Set LINEAR_TEAM_ID to your team key (e.g. TRGR) or the team UUID from Linear → team settings / API.`,
    };
  }
  return { ok: true, teamId: node.id };
}

function matchProjectNode(nodes: { id: string; slugId: string }[], slug: string): string | undefined {
  const variants = [...new Set([slug, slug.replace(/^client-work-/, ''), `client-work-${slug.replace(/^client-work-/, '')}`])];

  for (const v of variants) {
    const exact = nodes.find((n) => n.slugId.toLowerCase() === v);
    if (exact) {
      return exact.id;
    }
  }

  const byContains = nodes.find(
    (n) =>
      slug === n.slugId.toLowerCase() ||
      slug.endsWith(n.slugId.toLowerCase()) ||
      n.slugId.toLowerCase().endsWith(slug) ||
      slug.includes(n.slugId.toLowerCase()) ||
      n.slugId.toLowerCase().includes(slug),
  );
  if (byContains) {
    return byContains.id;
  }

  const hyphenTail = slug.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i);
  if (hyphenTail) {
    const id = hyphenTail[1];
    const byId = nodes.find((n) => n.id.toLowerCase() === id.toLowerCase());
    if (byId) {
      return byId.id;
    }
  }

  return undefined;
}

async function fetchProjectsWithFilter(
  apiKey: string,
  filter: Record<string, unknown> | null,
): Promise<{ id: string; slugId: string; teams?: { nodes: { id: string }[] } }[] | undefined> {
  if (filter) {
    const { status, data, errors } = await linearRequest<{
      projects: { nodes: { id: string; slugId: string }[] };
    }>(
      apiKey,
      `query ($filter: ProjectFilter!) { projects(filter: $filter, first: 250) { nodes { id slugId } } }`,
      { filter },
    );
    if (status < 200 || status >= 300 || errors?.length || !data?.projects?.nodes?.length) {
      return undefined;
    }
    return data.projects.nodes;
  }

  const { status, data, errors } = await linearRequest<{
    projects: { nodes: { id: string; slugId: string; teams: { nodes: { id: string }[] } }[] };
  }>(apiKey, `query { projects(first: 250) { nodes { id slugId teams { nodes { id } } } } }`);

  if (status < 200 || status >= 300 || errors?.length || !data?.projects?.nodes?.length) {
    return undefined;
  }
  return data.projects.nodes;
}

async function resolveProjectUuid(apiKey: string, teamUuid: string, configured: string): Promise<string | undefined> {
  const normalized = normalizeProjectSlugInput(configured);
  const uuidFromEnv = extractLinearUuid(normalized);
  if (uuidFromEnv) {
    return uuidFromEnv;
  }

  const slug = normalized.toLowerCase();

  const direct = await linearRequest<{
    project: { id: string; slugId: string; teams: { nodes: { id: string }[] } } | null;
  }>(apiKey, `query ($id: String!) { project(id: $id) { id slugId teams { nodes { id } } } }`, { id: normalized });

  if (
    direct.status >= 200 &&
    direct.status < 300 &&
    !direct.errors?.length &&
    direct.data?.project &&
    projectBelongsToTeam(teamUuid, direct.data.project.teams, true)
  ) {
    return direct.data.project.id;
  }

  const filterAttempts: Record<string, unknown>[] = [
    { teams: { id: { eq: teamUuid } } },
    { team: { id: { eq: teamUuid } } },
    { accessibleTeams: { id: { eq: teamUuid } } },
  ];

  for (const f of filterAttempts) {
    const nodes = await fetchProjectsWithFilter(apiKey, f);
    if (!nodes?.length) {
      continue;
    }
    const hit = matchProjectNode(nodes, slug);
    if (hit) {
      return hit;
    }
  }

  const all = await fetchProjectsWithFilter(apiKey, null);
  if (all?.length) {
    const scoped = all.filter((n) => projectBelongsToTeam(teamUuid, n.teams, false));
    const hit = matchProjectNode(scoped, slug);
    if (hit) {
      return hit;
    }
  }

  return undefined;
}

export type LinearOnboardingIssueResult =
  | { ok: true; url?: string }
  | { ok: false; error: string; reason: 'not_configured' | 'api_error' };

export async function createLinearOnboardingIssue(
  payload: OnboardingPayload,
  fileUrls: { label: string; url: string }[],
  notionPageUrl?: string,
): Promise<LinearOnboardingIssueResult> {
  const apiKey = getEnv('LINEAR_API_KEY');
  const teamRaw = getEnv('LINEAR_TEAM_ID');
  if (!apiKey || !teamRaw) {
    return {
      ok: false,
      error: 'Add LINEAR_API_KEY and LINEAR_TEAM_ID to your environment.',
      reason: 'not_configured',
    };
  }

  const teamRes = await resolveTeamUuid(apiKey, teamRaw);
  if (!teamRes.ok) {
    return { ok: false, error: teamRes.error, reason: 'api_error' };
  }
  const teamId = teamRes.teamId;

  const projectRaw = getEnv('LINEAR_PROJECT_ID');
  let projectId: string | undefined;
  if (projectRaw) {
    projectId = await resolveProjectUuid(apiKey, teamId, projectRaw);
    if (!projectId) {
      return {
        ok: false,
        error: `Could not resolve LINEAR_PROJECT_ID for this team. Paste the full project URL (e.g. https://linear.app/…/project/…/overview), the slug (client-work-…), or the project UUID. Last value tried: "${projectRaw}".`,
        reason: 'api_error',
      };
    }
  }

  const assigneeUuid = extractLinearUuid(getEnv('LINEAR_ASSIGNEE_ID'));
  const stateUuid = extractLinearUuid(getEnv('LINEAR_WORKFLOW_STATE_TODO_ID'));

  const title = `[Onboarding] ${payload.businessName} — ${serviceLabelForPayload(payload)}`;
  let description = buildOnboardingSummary(payload, fileUrls);
  if (notionPageUrl) {
    description += `\n\nNotion: ${notionPageUrl}`;
  }
  if (description.length > 250000) {
    description = description.slice(0, 250000) + '\n…(truncated)';
  }

  const minimalInput: Record<string, string> = { teamId, title, description };
  const fullInput: Record<string, string> = { ...minimalInput };
  if (assigneeUuid) {
    fullInput.assigneeId = assigneeUuid;
  }
  if (projectId) {
    fullInput.projectId = projectId;
  }
  if (stateUuid) {
    fullInput.stateId = stateUuid;
  }

  const hadOptionals = Boolean(fullInput.assigneeId || fullInput.projectId || fullInput.stateId);

  const postCreate = async (input: Record<string, string>) => {
    const { status, data, errors } = await linearRequest<IssueCreateData>(apiKey, CREATE_ISSUE_QUERY, { input });
    return resultFromIssueCreate(status, data, errors);
  };

  try {
    let out = await postCreate(fullInput);
    if (out.ok) {
      return { ok: true, url: out.url };
    }

    if (hadOptionals) {
      out = await postCreate(minimalInput);
      if (out.ok) {
        return { ok: true, url: out.url };
      }
      return {
        ok: false,
        error: `${out.error} (retry without project/state/assignee also failed)`,
        reason: 'api_error',
      };
    }

    return { ok: false, error: out.error, reason: 'api_error' };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e), reason: 'api_error' };
  }
}
