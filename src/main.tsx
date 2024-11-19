import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize theme based on stored preference
const isDark = localStorage.getItem('theme-storage') ? 
  JSON.parse(localStorage.getItem('theme-storage')!).state.isDark : 
  window.matchMedia('(prefers-color-scheme: dark)').matches;

if (isDark) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)