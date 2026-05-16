import { BothOnboardingClient } from '@/components/onboarding/BothOnboardingClient';

type Props = { searchParams: Promise<{ name?: string }> };

export default async function OnboardingBothPage({ searchParams }: Props) {
  const sp = await searchParams;
  const greetingName = typeof sp.name === 'string' ? decodeURIComponent(sp.name).trim() : undefined;
  return <BothOnboardingClient greetingName={greetingName} />;
}
