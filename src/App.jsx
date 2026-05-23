import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Seleccion from './pages/Seleccion'
import Intercambio from './pages/Intercambio'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/seleccion/:id" element={<Seleccion />} />
        <Route path="/intercambio" element={<Intercambio />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
