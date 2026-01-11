import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Accept from './pages/Accept';
import './index.css';

const path = window.location.pathname;
const RootComponent = path.startsWith('/accept') ? Accept : App;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
