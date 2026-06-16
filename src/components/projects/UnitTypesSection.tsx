'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, ChevronDown, LayoutDashboard, Maximize2, Tag, X } from 'lucide-react'
import { formatPrice } from '@/lib/format'
import type { UnitType } from '@/types'

function statusBadge(u: UnitType) {
  if (u.available === 0) {
    return <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Tükendi</span>
  }
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
      {u.available} müsait
    </span>
  )
}

export default function UnitTypesSection({ unitTypes }: { unitTypes: UnitType[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const [planModal, setPlanModal] = useState<UnitType | null>(null)

  if (!unitTypes || unitTypes.length === 0) return null

  const totalUnits = unitTypes.reduce((s, u) => s + u.count, 0)
  const totalSold = unitTypes.reduce((s, u) => s + u.sold, 0)

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-semibold text-gray-900">Bağımsız Bölümler</h2>
        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {totalSold}/{totalUnits} satıldı
        </span>
      </div>
      <p className="text-xs text-gray-400 mb-5">Detayları görmek için bir daire tipine dokunun</p>

      <div className="space-y-2.5">
        {unitTypes.map((u, i) => {
          const open = openIdx === i
          return (
            <div
              key={u.oda + i}
              className={`rounded-xl border transition-colors ${
                open ? 'border-emerald-300 bg-emerald-50/40' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Başlık (tıklanabilir) */}
              <button
                type="button"
                onClick={() => setOpenIdx(open ? null : i)}
                className="w-full flex items-center gap-3 p-3.5 text-left"
                aria-expanded={open}
              >
                <span className={`shrink-0 inline-flex items-center justify-center w-14 h-10 rounded-lg font-bold text-sm ${
                  open ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}>
                  {u.oda.split(' ')[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 text-sm truncate">{u.oda}</p>
                  <p className="text-xs text-gray-500">
                    {u.m2.min}–{u.m2.max} m² · {u.count} adet
                  </p>
                </div>
                <div className="hidden sm:flex flex-col items-end mr-1">
                  <span className="text-xs text-gray-400">başlangıç</span>
                  <span className="font-semibold text-emerald-700 text-sm whitespace-nowrap">{formatPrice(u.priceFrom)}</span>
                </div>
                {statusBadge(u)}
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>

              {/* Açılan detay */}
              {open && (
                <div className="px-3.5 pb-4 pt-1">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
                    <Stat label="Alan" value={`${u.m2.min}–${u.m2.max} m²`} />
                    <Stat label="Başlangıç" value={formatPrice(u.priceFrom)} accent />
                    <Stat label="Müsait" value={`${u.available} adet`} />
                    <Stat label="Satılan" value={`${u.sold} / ${u.count}`} />
                  </div>

                  {u.features && u.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-1">
                      {u.features.map((f) => (
                        <span key={f} className="inline-flex items-center gap-1 text-xs bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full">
                          <Check className="w-3 h-3 text-emerald-600" />
                          {f}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setPlanModal(u)}
                    className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Mimari Planı Gör
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mimari plan modal */}
      {planModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setPlanModal(null)}
        >
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-emerald-600" /> {planModal.oda}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {planModal.m2.min}–{planModal.m2.max} m² · {formatPrice(planModal.priceFrom)}’den başlayan
                </p>
              </div>
              <button
                onClick={() => setPlanModal(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {planModal.floorPlan ? (
              <Image src={planModal.floorPlan} alt="Mimari plan" width={640} height={480} className="w-full rounded-xl border border-gray-100" />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-14 bg-gray-50 rounded-xl text-gray-400 border border-dashed border-gray-200">
                <Maximize2 className="w-12 h-12 text-gray-300" />
                <p className="text-sm">Mimari çizim henüz yüklenmedi</p>
                <p className="text-xs text-gray-300">Detaylı kat planı için müteahhitle iletişime geçin</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-2.5">
      <p className="text-[11px] text-gray-400">{label}</p>
      <p className={`text-sm font-semibold ${accent ? 'text-emerald-700' : 'text-gray-800'}`}>{value}</p>
    </div>
  )
}
