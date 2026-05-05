import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { TermsPage } from './pages/TermsPage';
import './index.css';

const path = window.location.pathname;
const isTerms = path === '/terms' || path === '/terms.html';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isTerms ? <TermsPage /> : <App />}
  </StrictMode>,
);
