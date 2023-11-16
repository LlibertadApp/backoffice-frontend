import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import AppRouter from './routes/router.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ElectoralDataContextProvider } from './hooks/useElectoralData/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <NextUIProvider>
                <ElectoralDataContextProvider>
                    <AppRouter />
                </ElectoralDataContextProvider>
            </NextUIProvider>
        </BrowserRouter>
    </React.StrictMode>
);
