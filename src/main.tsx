import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { DemoPage } from './pages/DemoPage';
import { TermsPage } from './pages/TermsPage';
import './index.css';

const path = window.location.pathname;
const isTerms = path === '/terms' || path === '/terms.html';
const isAbout = path === '/about' || path === '/about.html';
const isDemo = path === '/demo' || path === '/demo.html';
const isContact = path === '/contact' || path === '/contact.html';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isTerms ? <TermsPage /> : isAbout ? <AboutPage /> : isDemo ? <DemoPage /> : isContact ? <ContactPage /> : <App />}
  </StrictMode>,
);
