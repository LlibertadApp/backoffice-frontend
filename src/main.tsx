import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import AppRouter from './routes/router.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <NextUIProvider>
                <main className="dark text-foreground bg-background w-screen h-screen">
                    <AppRouter />
                </main>
            </NextUIProvider>
        </BrowserRouter>
    </React.StrictMode>
);
