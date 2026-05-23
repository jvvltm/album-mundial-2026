import { Link } from 'react-router-dom'
import { useAlbum } from '../context/AlbumContext'
import { getBanderaUrl } from '../data/banderas'
import { useInstallPWA } from '../hooks/useInstallPWA'

// ─── Sub-componentes ──────────────────────────────────────────

function TarjetaStat({ label, valor, total, colorClass, bgClass }) {
  const pct = total > 0 ? Math.round((valor / total) * 100) : 0
  return (
    <div className={`rounded-2xl border p-4 sm:p-5 flex flex-col gap-1 ${bgClass}`}>
      <span className={`text-xs font-semibold uppercase tracking-widest ${colorClass} opacity-70`}>
        {label}
      </span>
      <span className={`text-3xl sm:text-4xl font-bold ${colorClass}`}>{valor}</span>
      <span className="text-xs text-gray-400">
        {pct}% del total
      </span>
    </div>
  )
}

function BarraProgreso({ porcentaje, repetida, total }) {
  const pctRepetida = total > 0 ? Math.round((repetida / total) * 100) : 0
  return (
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden flex">
      <div
        className="h-full bg-green-500 transition-all duration-300"
        style={{ width: `${porcentaje}%` }}
      />
      <div
        className="h-full bg-yellow-400 transition-all duration-300"
        style={{ width: `${pctRepetida}%` }}
      />
    </div>
  )
}

const CONTINENTE_COLOR = {
  CONMEBOL:  'bg-yellow-50  text-yellow-700  border-yellow-200',
  UEFA:      'bg-blue-50    text-blue-700    border-blue-200',
  CONCACAF:  'bg-red-50     text-red-700     border-red-200',
  CAF:       'bg-orange-50  text-orange-700  border-orange-200',
  AFC:       'bg-purple-50  text-purple-700  border-purple-200',
  OFC:       'bg-teal-50    text-teal-700    border-teal-200',
}

function TarjetaSeleccion({ sel }) {
  const badge = CONTINENTE_COLOR[sel.continente] ?? 'bg-gray-100 text-gray-600 border-gray-200'
  const completa = sel.completada

  return (
    <Link
      to={`/seleccion/${sel.id}`}
      className={`
        group flex flex-col gap-2.5 rounded-xl border p-3.5 transition-all duration-200
        bg-white hover:shadow-md hover:-translate-y-0.5
        ${completa ? 'border-green-300 bg-green-50/40' : 'border-gray-200 hover:border-gray-300'}
      `}
    >
      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 tracking-wider">
          {getBanderaUrl(sel.id) && (
            <img
              src={getBanderaUrl(sel.id)}
              alt={sel.id}
              className="w-5 h-auto rounded-sm shadow-sm"
            />
          )}
          {sel.id}
        </span>
        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${badge}`}>
          {sel.continente}
        </span>
      </div>

      {/* Nombre */}
      <p className={`text-sm font-semibold leading-tight transition-colors group-hover:text-green-700 ${completa ? 'text-green-800' : 'text-gray-800'}`}>
        {sel.nombre}
      </p>

      {/* Barra */}
      <BarraProgreso
        porcentaje={sel.porcentaje}
        repetida={sel.repetida}
        total={sel.total}
      />

      {/* Pie */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-gray-400">
          {sel.tengo} / {sel.total}
        </span>
        {completa ? (
          <span className="text-[11px] font-bold text-green-600">✓ Completa</span>
        ) : (
          <span className="text-[11px] text-gray-400">Grupo {sel.grupo}</span>
        )}
      </div>
    </Link>
  )
}

// ─── Página principal ─────────────────────────────────────────

export default function Inicio() {
  const { getEstadisticas } = useAlbum()
  const stats = getEstadisticas()
  const completadas = stats.porSeleccion.filter((s) => s.completada).length
  const { isInstallable, install } = useInstallPWA()

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Álbum Mundial 2026 ⚽
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {stats.porcentaje}% completado · {completadas} de {stats.porSeleccion.length} selecciones completas
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isInstallable && (
              <button
                onClick={install}
                className="flex items-center gap-1.5 text-sm font-medium text-white bg-green-600 px-3 py-1.5 rounded-full hover:bg-green-700 active:scale-95 transition-all"
              >
                📲 Instalar
              </button>
            )}
            <Link
              to="/intercambio"
              className="flex items-center gap-1.5 text-sm font-medium text-yellow-700 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-full hover:bg-yellow-100 transition-colors"
            >
              🔄 Intercambio
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-8">

        {/* Tarjetas resumen */}
        <section className="grid grid-cols-3 gap-3 sm:gap-4">
          <TarjetaStat
            label="Pegadas"
            valor={stats.tengo}
            total={stats.total}
            colorClass="text-green-700"
            bgClass="bg-green-50 border-green-200"
          />
          <TarjetaStat
            label="Faltantes"
            valor={stats.falta}
            total={stats.total}
            colorClass="text-gray-700"
            bgClass="bg-white border-gray-200"
          />
          <TarjetaStat
            label="Repetidas"
            valor={stats.repetida}
            total={stats.total}
            colorClass="text-yellow-700"
            bgClass="bg-yellow-50 border-yellow-200"
          />
        </section>

        {/* Barra de progreso global */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Progreso global</span>
            <span>{stats.tengo} / {stats.total} láminas</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${stats.porcentaje}%` }}
            />
            <div
              className="h-full bg-yellow-400 transition-all duration-500"
              style={{ width: `${Math.round((stats.repetida / stats.total) * 100)}%` }}
            />
          </div>
          <div className="flex gap-4 text-[11px] text-gray-400">
            <span className="flex items-center gap-1">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-green-500" /> Pegadas
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-yellow-400" /> Repetidas
            </span>
          </div>
        </div>

        {/* Sección FWC */}
        {(() => {
          const fwc = stats.porSeleccion.find((s) => s.id === 'FWC')
          if (!fwc) return null
          return (
            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Láminas del torneo
              </h2>
              <Link
                to="/seleccion/FWC"
                className="flex items-center gap-4 rounded-xl border border-amber-300 bg-amber-50 p-4 hover:bg-amber-100 hover:shadow-md transition-all duration-200 group"
              >
                <span className="text-3xl">🏆</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-amber-900 text-sm group-hover:text-amber-700">
                    FIFA World Cup 2026
                  </p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    {fwc.tengo} de {fwc.total} láminas
                  </p>
                  <BarraProgreso porcentaje={fwc.porcentaje} repetida={fwc.repetida} total={fwc.total} />
                </div>
                <span className="text-amber-400 text-lg">›</span>
              </Link>
            </section>
          )
        })()}

        {/* Grilla de selecciones */}
        <section>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            48 selecciones · Grupos A – L
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {stats.porSeleccion.filter((s) => s.id !== 'FWC').map((sel) => (
              <TarjetaSeleccion key={sel.id} sel={sel} />
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}
