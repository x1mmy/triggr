import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AboutPage } from './pages/AboutPage';
import { TermsPage } from './pages/TermsPage';
import './index.css';

const path = window.location.pathname;
const isTerms = path === '/terms' || path === '/terms.html';
const isAbout = path === '/about' || path === '/about.html';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isTerms ? <TermsPage /> : isAbout ? <AboutPage /> : <App />}
  </StrictMode>,
);
