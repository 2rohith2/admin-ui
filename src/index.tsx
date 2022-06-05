import React from 'react';
import ReactDOM from 'react-dom/client';
import DashboardContainer from './Dashboard';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DashboardContainer />
  </React.StrictMode>
);