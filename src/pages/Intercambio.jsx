import { useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAlbum } from '../context/AlbumContext'
import { selecciones, seccionFWC } from '../data/selecciones'

const todasLasSecciones = [seccionFWC, ...selecciones]

// ─── Índice estático (se construye una sola vez al cargar el módulo) ──────────
// Permite lookups O(1): laminaIndex['ARG-3'] → { id, numero, tipo, nombre, seleccionId, seleccionNombre }
const laminaIndex = Object.fromEntries(
  todasLasSecciones.flatMap((sel) =>
    sel.laminas.map((l) => [
      l.id,
      { ...l, seleccionId: sel.id, seleccionNombre: sel.nombre },
    ])
  )
)

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Extrae IDs con formato "XXX-N" de cualquier texto libre
const extraerIds = (texto) => {
  const matches = texto.matchAll(/([A-Z]{2,4}-\d{1,2})/g)
  return [...new Set([...matches].map((m) => m[1]))]
}

const copiarAlPortapapeles = async (texto) => {
  try {
    await navigator.clipboard.writeText(texto)
    return true
  } catch {
    // Fallback para entornos sin Clipboard API
    const el = document.createElement('textarea')
    el.value = texto
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    return true
  }
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function ChipLamina({ lamina, variante = 'yellow' }) {
  const estilos = {
    yellow: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    blue:   'bg-blue-50   text-blue-800   border-blue-200',
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${estilos[variante]}`}>
      <span className="font-bold text-[10px] opacity-60">#{lamina.numero}</span>
      {lamina.nombre}
    </span>
  )
}

function GrupoLaminas({ seleccion, laminas, variante = 'yellow' }) {
  const colorHeader = {
    yellow: 'text-yellow-900 bg-yellow-50  border-yellow-100',
    blue:   'text-blue-900   bg-blue-50    border-blue-100',
  }
  return (
    <div className={`rounded-xl border overflow-hidden ${colorHeader[variante].split(' ').slice(2).join(' ')}`}>
      <div className={`flex items-center justify-between px-3 py-2 border-b ${colorHeader[variante]}`}>
        <span className="text-xs font-bold uppercase tracking-wider opacity-60">{seleccion.id}</span>
        <span className="text-sm font-semibold">{seleccion.nombre}</span>
        <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
          variante === 'yellow' ? 'bg-yellow-200 text-yellow-800' : 'bg-blue-200 text-blue-800'
        }`}>
          {laminas.length}
        </span>
      </div>
      <div className="px-3 py-2.5 flex flex-wrap gap-1.5 bg-white">
        {laminas.map((l) => (
          <ChipLamina key={l.id} lamina={l} variante={variante} />
        ))}
      </div>
    </div>
  )
}

function EstadoVacio({ icono, titulo, subtitulo }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-8 text-center text-gray-400 space-y-1.5">
      <p className="text-3xl">{icono}</p>
      <p className="text-sm font-semibold text-gray-500">{titulo}</p>
      {subtitulo && <p className="text-xs">{subtitulo}</p>}
    </div>
  )
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default function Intercambio() {
  const { laminas } = useAlbum()
  const [pegado, setPegado]   = useState('')
  const [copiado, setCopiado] = useState(false)

  // ── Mis repetidas agrupadas por selección ────────────────────────────────
  const gruposRepetidas = useMemo(() => {
    const idsRepetidas = new Set(
      Object.entries(laminas)
        .filter(([, estado]) => estado === 'repetida')
        .map(([id]) => id)
    )

    return todasLasSecciones
      .map((sel) => ({
        seleccion: sel,
        laminas: sel.laminas.filter((l) => idsRepetidas.has(l.id)),
      }))
      .filter((g) => g.laminas.length > 0)
  }, [laminas])

  const totalRepetidas = gruposRepetidas.reduce((acc, g) => acc + g.laminas.length, 0)

  // ── Texto formateado para WhatsApp ───────────────────────────────────────
  const textoWhatsApp = useMemo(() => {
    if (gruposRepetidas.length === 0) return ''
    const lista = gruposRepetidas
      .flatMap((g) => g.laminas.map((l) => `${l.id} (${l.nombre})`))
      .join(', ')
    return `🔄 Mis repetidas: ${lista}`
  }, [gruposRepetidas])

  // ── Análisis de texto pegado: coincidencias con mis faltantes ────────────
  const coincidencias = useMemo(() => {
    if (!pegado.trim()) return []

    return extraerIds(pegado)
      .filter((id) => laminaIndex[id] && (laminas[id] ?? 'falta') === 'falta')
      .map((id) => laminaIndex[id])
  }, [pegado, laminas])

  const gruposCoincidencias = useMemo(() => {
    const mapa = {}
    coincidencias.forEach((l) => {
      if (!mapa[l.seleccionId]) {
        mapa[l.seleccionId] = {
          seleccion: todasLasSecciones.find((s) => s.id === l.seleccionId),
          laminas: [],
        }
      }
      mapa[l.seleccionId].laminas.push(l)
    })
    return Object.values(mapa)
  }, [coincidencias])

  // ── Copiar al portapapeles ────────────────────────────────────────────────
  const handleCopiar = useCallback(async () => {
    if (!textoWhatsApp) return
    const ok = await copiarAlPortapapeles(textoWhatsApp)
    if (ok) {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2200)
    }
  }, [textoWhatsApp])

  // ── Texto de ayuda con cuántos IDs detectó en el pegado ──────────────────
  const idsDetectados = useMemo(() => extraerIds(pegado), [pegado])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="shrink-0 text-sm text-gray-400 hover:text-gray-700 transition-colors">
            ← Volver
          </Link>
          <h1 className="font-bold text-gray-900 flex-1">Intercambio</h1>
          {totalRepetidas > 0 && (
            <span className="shrink-0 text-xs font-bold text-yellow-700 bg-yellow-50 border border-yellow-200 px-2.5 py-1 rounded-full">
              {totalRepetidas} repetidas
            </span>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-5 space-y-8">

        {/* ── SECCIÓN 1: Mis repetidas ──────────────────────────────── */}
        <section className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-bold text-gray-800">Mis repetidas</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {totalRepetidas === 0
                  ? 'Todavía no marcaste láminas repetidas.'
                  : `${totalRepetidas} láminas en ${gruposRepetidas.length} selecciones`}
              </p>
            </div>
            {totalRepetidas > 0 && (
              <button
                onClick={handleCopiar}
                className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  copiado
                    ? 'bg-green-500 text-white scale-95'
                    : 'bg-gray-900 text-white hover:bg-gray-700 active:scale-95'
                }`}
              >
                {copiado ? (
                  <>✓ Copiado</>
                ) : (
                  <>📋 Copiar lista</>
                )}
              </button>
            )}
          </div>

          {/* Preview del texto que se copiará */}
          {totalRepetidas > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 font-mono text-[11px] text-gray-500 leading-relaxed line-clamp-2 select-all">
              {textoWhatsApp}
            </div>
          )}

          {/* Lista de grupos */}
          {gruposRepetidas.length === 0 ? (
            <EstadoVacio
              icono="📦"
              titulo="Sin láminas repetidas aún"
              subtitulo="Entrá a una selección y marcá las que tenés de más."
            />
          ) : (
            <div className="space-y-2.5">
              {gruposRepetidas.map(({ seleccion, laminas: lams }) => (
                <GrupoLaminas
                  key={seleccion.id}
                  seleccion={seleccion}
                  laminas={lams}
                  variante="yellow"
                />
              ))}
            </div>
          )}
        </section>

        {/* ── SECCIÓN 2: Buscar coincidencias ─────────────────────── */}
        <section className="space-y-3">
          <div>
            <h2 className="font-bold text-gray-800">¿Qué me pueden dar?</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Pegá la lista de repetidas de otro coleccionista y te muestro cuáles necesitás.
            </p>
          </div>

          {/* Textarea */}
          <div className="space-y-1.5">
            <textarea
              value={pegado}
              onChange={(e) => setPegado(e.target.value)}
              placeholder="🔄 Mis repetidas: ARG-3 (Emiliano Martínez), BRA-5 (Marquinhos)..."
              rows={4}
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none transition"
            />
            <div className="flex items-center justify-between px-0.5">
              <span className="text-[11px] text-gray-400">
                {pegado.trim()
                  ? `${idsDetectados.length} ID${idsDetectados.length !== 1 ? 's' : ''} detectado${idsDetectados.length !== 1 ? 's' : ''}`
                  : 'Aceptá cualquier formato que contenga IDs como ARG-3'}
              </span>
              {pegado && (
                <button
                  onClick={() => setPegado('')}
                  className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Limpiar ×
                </button>
              )}
            </div>
          </div>

          {/* Resultados */}
          {pegado.trim() && (
            <div className="space-y-2.5">
              {coincidencias.length === 0 ? (
                <EstadoVacio
                  icono="🤷"
                  titulo="Sin coincidencias"
                  subtitulo={
                    idsDetectados.length === 0
                      ? 'No encontré IDs con el formato esperado (ej: ARG-3).'
                      : 'Ninguna de sus repetidas coincide con tus faltantes.'
                  }
                />
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden">
                  {/* Cabecera resultado */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-blue-200">
                    <p className="text-sm font-bold text-blue-900">
                      🎯 Podés pedirle {coincidencias.length} lámina{coincidencias.length !== 1 ? 's' : ''}
                    </p>
                    <CopiarCoincidencias coincidencias={coincidencias} />
                  </div>
                  {/* Grupos */}
                  <div className="p-3 space-y-2.5">
                    {gruposCoincidencias.map(({ seleccion, laminas: lams }) => (
                      <GrupoLaminas
                        key={seleccion.id}
                        seleccion={seleccion}
                        laminas={lams}
                        variante="blue"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

      </main>
    </div>
  )
}

// ─── Botón para copiar las coincidencias como lista ───────────────────────────
function CopiarCoincidencias({ coincidencias }) {
  const [copiado, setCopiado] = useState(false)

  const texto = coincidencias
    .map((l) => `${l.id} (${l.nombre})`)
    .join(', ')
  const textoCompleto = `📋 Necesito: ${texto}`

  const handleCopiar = async () => {
    const ok = await copiarAlPortapapeles(textoCompleto)
    if (ok) {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2200)
    }
  }

  return (
    <button
      onClick={handleCopiar}
      className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all ${
        copiado
          ? 'bg-green-500 text-white'
          : 'bg-blue-200 text-blue-800 hover:bg-blue-300'
      }`}
    >
      {copiado ? '✓ Copiado' : '📋 Copiar'}
    </button>
  )
}
