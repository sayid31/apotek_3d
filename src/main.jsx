import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'

import './styles/global.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/home.css'
import './styles/pages.css'
import './styles/store.css'
import './styles/three.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
