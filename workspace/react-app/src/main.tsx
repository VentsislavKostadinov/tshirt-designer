import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './style/style.scss'
import './style/desktop.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
