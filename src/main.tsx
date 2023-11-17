import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import AppRouter from './routes/router.tsx';
import { BrowserRouter } from 'react-router-dom';

import { FiscalProvider } from './context/FiscalContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <AuthProvider>
          <FiscalProvider>
            <main className="dark text-foreground bg-neutral-950 w-screen h-screen">
              <AppRouter />
            </main>
          </FiscalProvider>
        </AuthProvider>
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);
