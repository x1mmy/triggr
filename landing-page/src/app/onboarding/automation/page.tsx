import { AutomationOnboardingClient } from '@/components/onboarding/AutomationOnboardingClient';

type Props = { searchParams: Promise<{ name?: string }> };

export default async function OnboardingAutomationPage({ searchParams }: Props) {
  const sp = await searchParams;
  const greetingName = typeof sp.name === 'string' ? decodeURIComponent(sp.name).trim() : undefined;
  return <AutomationOnboardingClient greetingName={greetingName} />;
}
