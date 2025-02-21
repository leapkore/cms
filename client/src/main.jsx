import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './components/Header.css'
import './pages/SignUp.css'
import './pages/Home.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
