import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure Tailwind is loaded
import SSBMMenu from './components/SSBMMenu'; // Import the SSBM menu

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SSBMMenu />
  </React.StrictMode>
);
