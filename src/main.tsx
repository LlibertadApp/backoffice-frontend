import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import AppRouter from './routes/router.tsx';
import { BrowserRouter } from 'react-router-dom';

import { FiscalProvider } from './context/FiscalContext.tsx';
import { FiscalEditProvider } from './context/FiscalEditContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <AuthProvider>
          <FiscalProvider>
            <FiscalEditProvider>
              <AppRouter />
            </FiscalEditProvider>
          </FiscalProvider>
        </AuthProvider>
      </NextUIProvider>
    </BrowserRouter>
  </StrictMode>
);
