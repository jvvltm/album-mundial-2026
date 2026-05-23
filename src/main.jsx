import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AlbumProvider } from './context/AlbumContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AlbumProvider>
      <App />
    </AlbumProvider>
  </StrictMode>,
)
