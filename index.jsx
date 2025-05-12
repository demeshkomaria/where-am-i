import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App';
import './src/styles.css';

// new EventSource('/esbuild').addEventListener('change', () => location.reload());

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <App/>
  </StrictMode>
);