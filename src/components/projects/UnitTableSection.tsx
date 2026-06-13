'use client'

import { useState } from 'react'
import { FileText, Box, X, LayoutDashboard } from 'lucide-react'
import { formatPrice } from '@/lib/format'

export interface Unit {
  kat: number
  daireNo: number
  m2: number
  oda: string
  durum: 'Satışta' | 'Satıldı' | 'Opsiyonlu'
  fiyat: number
  mimarCizim?: string
  model3d?: string
}

function katLabel(kat: number) {
  return kat === 0 ? 'Zemin Kat' : `${kat}. Kat`
}

interface TypeSummary {
  oda: string
  total: number
  satista: number
  satilan: number
  opsiyonlu: number
}

function buildSummary(units: Unit[]): TypeSummary[] {
  const map = new Map<string, TypeSummary>()
  for (const u of units) {
    if (!map.has(u.oda)) {
      map.set(u.oda, { oda: u.oda, total: 0, satista: 0, satilan: 0, opsiyonlu: 0 })
    }
    const s = map.get(u.oda)!
    s.total++
    if (u.durum === 'Satışta') s.satista++
    else if (u.durum === 'Satıldı') s.satilan++
    else if (u.durum === 'Opsiyonlu') s.opsiyonlu++
  }
  return Array.from(map.values()).sort((a, b) => a.oda.localeCompare(b.oda))
}

export default function UnitTableSection({ units }: { units: Unit[] }) {
  const [mimarModal, setMimarModal] = useState<Unit | null>(null)
  const [model3dModal, setModel3dModal] = useState<Unit | null>(null)
  const summary = buildSummary(units)
  const totalSatilan = units.filter(u => u.durum === 'Satıldı').length

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-gray-900">Bağımsız Bölümler</h2>
        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {totalSatilan}/{units.length} satıldı
        </span>
      </div>

      {/* Daire Tipi Özeti */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {summary.map(s => (
          <div key={s.oda} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-800">{s.oda}</span>
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                {s.total} adet
              </span>
            </div>
            <div className="space-y-0.5 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Satışta</span>
                <span className="font-semibold text-emerald-600">{s.satista}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Satıldı</span>
                <span className="font-semibold text-gray-400">{s.satilan}</span>
              </div>
              {s.opsiyonlu > 0 && (
                <div className="flex justify-between text-gray-500">
                  <span>Opsiyonlu</span>
                  <span className="font-semibold text-amber-600">{s.opsiyonlu}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tablo */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="pb-2 pr-4 font-medium whitespace-nowrap">Kat</th>
              <th className="pb-2 pr-4 font-medium whitespace-nowrap">Daire No</th>
              <th className="pb-2 pr-4 font-medium">m²</th>
              <th className="pb-2 pr-4 font-medium">Oda</th>
              <th className="pb-2 pr-4 font-medium">Fiyat</th>
              <th className="pb-2 pr-4 font-medium">Durum</th>
              <th className="pb-2 pr-4 font-medium whitespace-nowrap">Mimari Plan</th>
              <th className="pb-2 font-medium whitespace-nowrap">3D Görünüm</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {units.map((u, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="py-3 pr-4 text-gray-700 whitespace-nowrap">{katLabel(u.kat)}</td>
                <td className="py-3 pr-4 text-gray-700 whitespace-nowrap">{u.daireNo}. Daire</td>
                <td className="py-3 pr-4 text-gray-700">{u.m2} m²</td>
                <td className="py-3 pr-4 text-gray-700 font-medium">{u.oda}</td>
                <td className="py-3 pr-4 font-semibold text-emerald-700 whitespace-nowrap">
                  {formatPrice(u.fiyat)}
                </td>
                <td className="py-3 pr-4">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
                    u.durum === 'Satışta'
                      ? 'bg-emerald-100 text-emerald-700'
                      : u.durum === 'Satıldı'
                      ? 'bg-gray-100 text-gray-500'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {u.durum}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <button
                    onClick={() => setMimarModal(u)}
                    className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Plan
                  </button>
                </td>
                <td className="py-3">
                  <button
                    onClick={() => setModel3dModal(u)}
                    className="flex items-center gap-1.5 text-xs text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Box className="w-3.5 h-3.5" />
                    3D
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mimari Çizim Modal */}
      {mimarModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setMimarModal(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">Mimari Plan</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {katLabel(mimarModal.kat)} · {mimarModal.daireNo}. Daire · {mimarModal.oda} · {mimarModal.m2} m²
                </p>
              </div>
              <button
                onClick={() => setMimarModal(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {mimarModal.mimarCizim ? (
              <img
                src={mimarModal.mimarCizim}
                alt="Mimari plan"
                className="w-full rounded-xl border border-gray-100"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-14 bg-gray-50 rounded-xl text-gray-400 border border-dashed border-gray-200">
                <LayoutDashboard className="w-12 h-12 text-gray-300" />
                <p className="text-sm">Mimari çizim henüz yüklenmedi</p>
                <p className="text-xs text-gray-300">Müteahhit tarafından eklenecek</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3D Model Modal */}
      {model3dModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setModel3dModal(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">3D Görünüm</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {katLabel(model3dModal.kat)} · {model3dModal.daireNo}. Daire · {model3dModal.oda} · {model3dModal.m2} m²
                </p>
              </div>
              <button
                onClick={() => setModel3dModal(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {model3dModal.model3d ? (
              <iframe
                src={model3dModal.model3d}
                className="w-full h-80 rounded-xl border border-gray-100"
                title="3D model"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-14 bg-gray-50 rounded-xl text-gray-400 border border-dashed border-gray-200">
                <Box className="w-12 h-12 text-gray-300" />
                <p className="text-sm">3D model henüz yüklenmedi</p>
                <p className="text-xs text-gray-300">Müteahhit tarafından eklenecek</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
