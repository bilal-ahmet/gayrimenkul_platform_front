import Image from 'next/image'
import { Award, Building2, Calendar, CheckCircle2, Globe, Hammer, MapPin, Star } from 'lucide-react'
import type { Contractor } from '@/types'

function monogram(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toLocaleUpperCase('tr-TR')
}

export default function ContractorSection({ contractor: c }: { contractor: Contractor }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Kurumsal header band */}
      <div className="relative bg-gradient-to-r from-emerald-700 to-emerald-600 px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center text-white font-bold text-xl shrink-0 ring-1 ring-white/25">
            {monogram(c.name)}
          </div>
          <div className="min-w-0 text-white">
            <p className="text-[11px] uppercase tracking-wide text-emerald-100/90">İnşaat Firması</p>
            <h2 className="text-lg font-bold leading-tight truncate">{c.name}</h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-sm text-emerald-50">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span className="font-semibold">{c.rating}</span>
              </span>
              {c.city && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {c.city}
                </span>
              )}
              {c.foundedYear && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {c.foundedYear}’den beri
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* İstatistikler (gerçek sayılar) */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <Stat icon={<Hammer className="w-5 h-5 text-emerald-600" />} value={c.projectCount} label="Toplam Proje" />
          <Stat icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />} value={c.completedProjects ?? '—'} label="Tamamlanan" />
          <Stat icon={<Award className="w-5 h-5 text-emerald-600" />} value={c.rating} label="Memnuniyet Puanı" />
        </div>

        {c.about && <p className="text-sm text-gray-600 leading-relaxed">{c.about}</p>}

        {c.specialties && c.specialties.length > 0 && (
          <div className="mt-5">
            <p className="text-xs font-medium text-gray-500 mb-2">Uzmanlık Alanları</p>
            <div className="flex flex-wrap gap-2">
              {c.specialties.map((s) => (
                <span key={s} className="text-xs font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Son tamamlanan projeler vitrini */}
        {c.pastProjects && c.pastProjects.length > 0 && (
          <div className="mt-6 pt-5 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Son Tamamlanan Projeler</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {c.pastProjects.map((p) => (
                <div key={p.name} className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-2.5">
                  <div className="relative w-24 h-20 rounded-lg overflow-hidden bg-gray-200 shrink-0 flex items-center justify-center">
                    {p.imageUrl ? (
                      <Image src={p.imageUrl} alt={p.name} fill className="object-cover" sizes="96px" />
                    ) : (
                      <Building2 className="w-7 h-7 text-gray-300" />
                    )}
                  </div>
                  <div className="min-w-0 flex flex-col justify-center">
                    <p className="font-semibold text-gray-900 text-sm leading-tight">{p.name}</p>
                    {p.location && (
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {p.location}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      {p.type && <span className="text-[11px] bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{p.type}</span>}
                      {p.year && (
                        <span className="text-[11px] inline-flex items-center gap-1 text-emerald-700 font-medium">
                          <CheckCircle2 className="w-3 h-3" /> {p.year}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {c.website && (
          <a
            href={c.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <Globe className="w-4 h-4" />
            {c.website.replace(/^https?:\/\//, '')}
          </a>
        )}
      </div>
    </div>
  )
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
      <div className="flex justify-center mb-1.5">{icon}</div>
      <p className="text-lg font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}
