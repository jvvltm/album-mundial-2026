import { createContext, useContext, useState, useEffect } from 'react'
import { selecciones, seccionFWC } from '../data/selecciones'

const todasLasSecciones = [seccionFWC, ...selecciones]

const AlbumContext = createContext(null)

const STORAGE_KEY = 'album-mundial-2026'

const ESTADOS = ['falta', 'tengo', 'repetida']

const inicializarEstado = () => {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY)
    if (guardado) return JSON.parse(guardado)
  } catch {
    // localStorage corrupto: reiniciar
  }
  return Object.fromEntries(
    todasLasSecciones.flatMap((s) => s.laminas).map((l) => [l.id, 'falta'])
  )
}

export function AlbumProvider({ children }) {
  const [laminas, setLaminas] = useState(inicializarEstado)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(laminas))
  }, [laminas])

  const marcarLamina = (id, estado) => {
    if (!ESTADOS.includes(estado)) return
    setLaminas((prev) => ({ ...prev, [id]: estado }))
  }

  const getEstadisticas = () => {
    const porSeleccion = todasLasSecciones.map((s) => {
      const ids = s.laminas.map((l) => l.id)
      const r = ids.filter((id) => laminas[id] === 'repetida').length
      const soloTengo = ids.filter((id) => laminas[id] === 'tengo').length
      const t = soloTengo + r
      const f = ids.length - t
      return {
        id: s.id,
        nombre: s.nombre,
        grupo: s.grupo,
        continente: s.continente,
        total: ids.length,
        tengo: t,
        repetida: r,
        falta: f,
        completada: f === 0,
        porcentaje: Math.round((t / ids.length) * 100),
      }
    })

    const total    = porSeleccion.reduce((a, s) => a + s.total, 0)
    const tengo    = porSeleccion.reduce((a, s) => a + s.tengo, 0)
    const repetida = porSeleccion.reduce((a, s) => a + s.repetida, 0)
    const falta    = porSeleccion.reduce((a, s) => a + s.falta, 0)

    return {
      total,
      tengo,
      repetida,
      falta,
      porcentaje: Math.round((tengo / total) * 100),
      porSeleccion,
    }
  }

  return (
    <AlbumContext.Provider value={{ laminas, marcarLamina, getEstadisticas }}>
      {children}
    </AlbumContext.Provider>
  )
}

export const useAlbum = () => {
  const ctx = useContext(AlbumContext)
  if (!ctx) throw new Error('useAlbum debe usarse dentro de <AlbumProvider>')
  return ctx
}
