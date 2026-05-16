import { WebdevOnboardingClient } from '@/components/onboarding/WebdevOnboardingClient';

type Props = { searchParams: Promise<{ name?: string }> };

export default async function OnboardingWebdevPage({ searchParams }: Props) {
  const sp = await searchParams;
  const greetingName = typeof sp.name === 'string' ? decodeURIComponent(sp.name).trim() : undefined;
  return <WebdevOnboardingClient greetingName={greetingName} />;
}
