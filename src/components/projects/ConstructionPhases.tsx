'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Calendar, Check, Clock, ImageOff, Loader2, X } from 'lucide-react'
import ProgressBar from './ProgressBar'
import { PHASE_LABELS, PHASE_ORDER } from '@/data/projectContent'
import type { PhaseDetail } from '@/types'

interface Props {
  phaseDetails: PhaseDetail[]
  overallPercent: number
  delivery: string
  occupancyReady: boolean
}

export default function ConstructionPhases({ phaseDetails, overallPercent, delivery, occupancyReady }: Props) {
  // Varsayılan açık: ilk "devam eden" (0<percent<100) aşama, yoksa son tamamlanan
  const defaultIdx = (() => {
    const active = phaseDetails.findIndex((p) => p.percent > 0 && p.percent < 100)
    if (active >= 0) return active
    const lastDone = [...phaseDetails].reverse().findIndex((p) => p.percent === 100)
    return lastDone >= 0 ? phaseDetails.length - 1 - lastDone : 0
  })()
  const [openIdx, setOpenIdx] = useState(defaultIdx)
  const [viewer, setViewer] = useState<string | null>(null)

  const selected = phaseDetails[openIdx]

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900">İnşaat Aşaması</h2>
        <span className="text-sm font-semibold text-emerald-700">%{overallPercent} tamamlandı</span>
      </div>
      <ProgressBar percent={overallPercent} />

      {/* Aşama düğümleri */}
      <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-2">
        {PHASE_ORDER.map((key, i) => {
          const pd = phaseDetails.find((p) => p.key === key)
          const percent = pd?.percent ?? 0
          const done = percent === 100
          const active = percent > 0 && percent < 100
          const isOpen = openIdx === i
          return (
            <button
              key={key}
              type="button"
              onClick={() => setOpenIdx(i)}
              className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all ${
                isOpen ? 'border-emerald-400 bg-emerald-50 ring-1 ring-emerald-200' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                done ? 'bg-emerald-600 border-emerald-600' : active ? 'bg-white border-emerald-500' : 'bg-white border-gray-300'
              }`}>
                {done ? (
                  <Check className="w-4 h-4 text-white" />
                ) : active ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-gray-300" />
                )}
              </span>
              <span className={`text-[11px] sm:text-xs text-center leading-tight font-medium ${
                active ? 'text-emerald-700' : done ? 'text-emerald-600' : 'text-gray-400'
              }`}>
                {PHASE_LABELS[key]}
              </span>
              <span className={`text-[10px] ${active ? 'text-emerald-600 font-semibold' : done ? 'text-gray-400' : 'text-gray-300'}`}>
                %{percent}
              </span>
            </button>
          )
        })}
      </div>

      {/* Seçili aşama detayı */}
      {selected && (
        <div className="mt-5 pt-5 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">
              {PHASE_LABELS[selected.key]} — iş adımları
            </h3>
            <span className="text-xs text-gray-500">%{selected.percent} tamamlandı</span>
          </div>

          <div className="space-y-3">
            {selected.steps.map((step, si) => {
              const hasImages = step.images.length > 0
              const phaseDone = selected.percent === 100
              const inProgress = selected.percent > 0 && selected.percent < 100
              return (
                <div key={step.label + si} className="rounded-xl border border-gray-100 bg-gray-50/60 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    {hasImages || phaseDone ? (
                      <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </span>
                    ) : inProgress ? (
                      <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                        <Loader2 className="w-3 h-3 text-amber-600" />
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                        <Clock className="w-3 h-3 text-gray-400" />
                      </span>
                    )}
                    <span className="text-sm font-medium text-gray-700">{step.label}</span>
                  </div>

                  {hasImages ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pl-7">
                      {step.images.map((src, idx) => (
                        <button
                          key={src + idx}
                          type="button"
                          onClick={() => setViewer(src)}
                          className="relative h-20 rounded-lg overflow-hidden border border-gray-200 cursor-zoom-in group"
                        >
                          <Image src={src} alt={step.label} fill className="object-cover group-hover:scale-105 transition-transform" sizes="160px" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className={`pl-7 text-xs flex items-center gap-1.5 ${inProgress ? 'text-amber-600' : phaseDone ? 'text-gray-400' : 'text-gray-400'}`}>
                      <ImageOff className="w-3.5 h-3.5" />
                      {phaseDone
                        ? 'Tamamlandı — arşiv görseli eklenmedi'
                        : inProgress
                        ? 'Süreç devam ediyor, görsel henüz yüklenmedi'
                        : 'Planlandı'}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Teslim bilgileri */}
      <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-gray-400" />
          Tahmini Teslim: <strong>{delivery}</strong>
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-gray-400" />
          İskan: <strong>{occupancyReady ? 'Hazır' : 'Devam ediyor'}</strong>
        </span>
      </div>

      {/* Görsel büyütücü */}
      {viewer && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setViewer(null)}>
          <button
            type="button"
            onClick={() => setViewer(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10"
            aria-label="Kapat"
          >
            <X className="w-7 h-7" />
          </button>
          <div className="relative w-full h-full max-w-5xl max-h-[82vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={viewer} alt="Şantiye görseli" fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}
    </div>
  )
}
