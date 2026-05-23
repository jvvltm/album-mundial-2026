import { useState, useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useAlbum } from '../context/AlbumContext'
import { getSeleccionById } from '../data/selecciones'

// ─── Constantes ───────────────────────────────────────────────

const CICLO = ['falta', 'tengo', 'repetida']

const ESTILOS = {
  falta: {
    card: 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50',
    num:  'bg-gray-100 text-gray-400',
    txt:  'text-gray-400',
    tipo: 'text-gray-300',
  },
  tengo: {
    card: 'bg-green-50 border-green-400 shadow-sm shadow-green-100',
    num:  'bg-green-500 text-white',
    txt:  'text-green-800',
    tipo: 'text-green-400',
  },
  repetida: {
    card: 'bg-yellow-50 border-yellow-400 shadow-sm shadow-yellow-100',
    num:  'bg-yellow-400 text-yellow-900',
    txt:  'text-yellow-800',
    tipo: 'text-yellow-500',
  },
}

const TIPO_ICON = { escudo: '🛡', especial: '📸', jugador: '👤' }

const FILTROS = [
  { key: 'todas',    label: 'Todas'     },
  { key: 'falta',    label: 'Faltantes' },
  { key: 'repetida', label: 'Repetidas' },
]

// ─── Sub-componentes ──────────────────────────────────────────

function TarjetaLamina({ lamina, estado, onClick }) {
  const e = ESTILOS[estado]
  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-between gap-1
        rounded-xl border-2 p-2 transition-all duration-150
        w-full aspect-square select-none active:scale-95 cursor-pointer
        ${e.card}
      `}
      title={`${lamina.nombre} — click para cambiar estado`}
    >
      {/* Número */}
      <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md w-full text-center leading-none ${e.num}`}>
        {lamina.numero}
      </span>

      {/* Nombre */}
      <span className={`text-[10px] font-medium text-center leading-snug line-clamp-2 flex-1 flex items-center justify-center w-full px-0.5 ${e.txt}`}>
        {lamina.nombre}
      </span>

      {/* Tipo */}
      <span className={`text-[11px] leading-none ${e.tipo}`} aria-hidden>
        {TIPO_ICON[lamina.tipo]}
      </span>
    </button>
  )
}

function TabFiltro({ filtroKey, label, count, activo, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
        transition-all duration-150 whitespace-nowrap
        ${activo
          ? 'bg-gray-900 text-white shadow-sm'
          : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
        }
      `}
    >
      {label}
      <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${activo ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
        {count}
      </span>
    </button>
  )
}

// ─── Página ───────────────────────────────────────────────────

export default function Seleccion() {
  // Todos los hooks se llaman incondicionalmente, antes del early return
  const { id } = useParams()
  const { laminas, marcarLamina } = useAlbum()
  const [filtro, setFiltro] = useState('todas')

  const seleccion = useMemo(() => getSeleccionById(id), [id])

  const statsSel = useMemo(() => {
    if (!seleccion) return null
    const ids = seleccion.laminas.map((l) => l.id)
    const estado    = (lid) => laminas[lid] ?? 'falta'
    const soloTengo = ids.filter((lid) => estado(lid) === 'tengo').length
    const repetida  = ids.filter((lid) => estado(lid) === 'repetida').length
    const tengo     = soloTengo + repetida
    const falta     = ids.length - tengo
    return {
      tengo,
      soloTengo,
      repetida,
      falta,
      total: ids.length,
      porcentaje: Math.round((tengo / ids.length) * 100),
    }
  }, [seleccion, laminas])

  const laminasFiltradas = useMemo(() => {
    if (!seleccion) return []
    if (filtro === 'todas') return seleccion.laminas
    return seleccion.laminas.filter((l) => (laminas[l.id] ?? 'falta') === filtro)
  }, [filtro, seleccion, laminas])

  const conteoFiltro = useMemo(() => {
    if (!seleccion) return {}
    return {
      todas:    seleccion.laminas.length,
      falta:    seleccion.laminas.filter((l) => (laminas[l.id] ?? 'falta') === 'falta').length,
      repetida: seleccion.laminas.filter((l) => laminas[l.id] === 'repetida').length,
    }
  }, [seleccion, laminas])

  // Early return seguro: todos los hooks ya fueron llamados
  if (!seleccion) return <Navigate to="/" replace />

  const ciclar = (laminaId) => {
    const actual = laminas[laminaId] ?? 'falta'
    const siguiente = CICLO[(CICLO.indexOf(actual) + 1) % CICLO.length]
    marcarLamina(laminaId, siguiente)
  }

  const estadoVacio = {
    falta:    '¡No te falta ninguna! Selección completa 🎉',
    repetida: 'No tienes láminas repetidas de este equipo.',
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header sticky */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            to="/"
            className="shrink-0 text-sm text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1"
          >
            ← Volver
          </Link>

          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-gray-900 truncate">{seleccion.nombre}</h1>
            <p className="text-xs text-gray-400">
              {seleccion.grupo ? `Grupo ${seleccion.grupo} · ${seleccion.continente}` : 'Láminas del torneo · 00 – FWC 19'}
            </p>
          </div>

          {statsSel.porcentaje === 100 ? (
            <span className="shrink-0 text-xs font-bold text-green-700 bg-green-50 border border-green-300 px-2.5 py-1 rounded-full">
              ✓ Completa
            </span>
          ) : (
            <span className="shrink-0 text-sm font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
              {statsSel.porcentaje}%
            </span>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-5 space-y-5">

        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { label: 'Pegadas',   val: statsSel.tengo,    cls: 'text-green-700  bg-green-50  border-green-200'  },
            { label: 'Faltantes', val: statsSel.falta,    cls: 'text-gray-600   bg-white     border-gray-200'   },
            { label: 'Repetidas', val: statsSel.repetida, cls: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
          ].map(({ label, val, cls }) => (
            <div key={label} className={`rounded-xl border py-2.5 ${cls}`}>
              <p className="text-2xl font-bold">{val}</p>
              <p className="text-[11px] opacity-60 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Barra de progreso */}
        <div className="space-y-1.5">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${Math.round((statsSel.soloTengo / statsSel.total) * 100)}%` }}
            />
            <div
              className="h-full bg-yellow-400 transition-all duration-300"
              style={{ width: `${Math.round((statsSel.repetida / statsSel.total) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-400 text-right">
            {statsSel.tengo} de {statsSel.total} láminas pegadas
          </p>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 flex-wrap">
          {FILTROS.map(({ key, label }) => (
            <TabFiltro
              key={key}
              filtroKey={key}
              label={label}
              count={conteoFiltro[key]}
              activo={filtro === key}
              onClick={() => setFiltro(key)}
            />
          ))}
        </div>

        {/* Grilla de láminas */}
        {laminasFiltradas.length === 0 ? (
          <div className="text-center py-16 text-gray-400 space-y-2">
            <p className="text-4xl">{filtro === 'falta' ? '🎉' : '✅'}</p>
            <p className="text-sm font-medium">{estadoVacio[filtro]}</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {laminasFiltradas.map((lamina) => (
              <TarjetaLamina
                key={lamina.id}
                lamina={lamina}
                estado={laminas[lamina.id] ?? 'falta'}
                onClick={() => ciclar(lamina.id)}
              />
            ))}
          </div>
        )}

        {/* Leyenda */}
        <div className="flex flex-wrap gap-x-5 gap-y-1 justify-center text-xs text-gray-400 pt-1 pb-6">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-gray-100 border border-gray-300 inline-block" />
            Falta
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-green-500 inline-block" />
            Tengo
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-yellow-400 inline-block" />
            Repetida
          </span>
          <span>· Toca para cambiar estado</span>
        </div>

      </main>
    </div>
  )
}
