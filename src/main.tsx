import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import AppRouter from './routes/router.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <NextUIProvider>
      <BrowserRouter>
     <main className="dark text-foreground bg-background w-screen h-screen">
        <AppRouter />
        </main>
      </BrowserRouter>

     </NextUIProvider>
  </React.StrictMode>,
)
