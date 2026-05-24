import { LogoMark } from '@/components/LogoMark';

export function MarketingPageHeader() {
  return (
    <header className="marketing-header reveal reveal--subtle">
      <a href="/" className="marketing-header__logo" aria-label="Triggr home">
        <LogoMark size={22} color="#F0F0EE" />
        <span className="marketing-header__wordmark">TRIGGR</span>
      </a>
      <a href="/" className="marketing-header__back">
        ← Back to site
      </a>
    </header>
  );
}
