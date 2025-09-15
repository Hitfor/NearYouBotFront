import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if (window.Telegram.WebApp) {
  window.Telegram.WebApp.ready(); // Notify Telegram that the web app is ready
  window.Telegram.WebApp.expand(); // Expand the web app to full height
}
