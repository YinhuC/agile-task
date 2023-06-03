import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './providers/ThemeProvider';
import { RouterProvider } from 'react-router-dom';
import router from './config/routerConfig';
import Header from './components/Header';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ThemeProvider>
      <Header />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
