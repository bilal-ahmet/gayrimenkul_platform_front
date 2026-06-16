import {
  Building, Layers, Snowflake, PanelTop, Wrench, Cpu, ShieldCheck, Sparkles, FileCheck2,
} from 'lucide-react'
import type { TechSpecGroup } from '@/types'

// Kategori → ikon eşlemesi (eşleşmezse Building)
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Yapısal Sistem': Building,
  'Isı & Ses Yalıtımı': Snowflake,
  'Cephe & Doğrama': PanelTop,
  'Mekanik Tesisat': Wrench,
  'Mekanik & Konfor': Wrench,
  'Elektrik & Akıllı Sistemler': Cpu,
  'Akıllı Ev & Güvenlik': ShieldCheck,
}

export default function TechnicalSpecs({ specs }: { specs: TechSpecGroup[] }) {
  if (!specs || specs.length === 0) return null

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-start gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0">
          <FileCheck2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">Bina Teknik Şartnamesi</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Yapıda kullanılan malzeme, sistem ve standartlar — kalite ve güvenin teminatı
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
        {specs.map((group) => {
          const Icon = ICONS[group.category] ?? Layers
          return (
            <div key={group.category} className="rounded-xl border border-gray-100 bg-gray-50/60 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-semibold text-gray-800">{group.category}</h3>
              </div>
              <dl className="space-y-2.5">
                {group.items.map((item) => (
                  <div key={item.label} className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
                    <dt className="text-xs text-gray-400 sm:w-28 shrink-0">{item.label}</dt>
                    <dd className="text-xs text-gray-700 font-medium leading-snug">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )
        })}
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-[11px] text-gray-400">
        <Sparkles className="w-3.5 h-3.5" />
        Şartname; ruhsat, proje ve sözleşme ekleriyle birlikte bağlayıcıdır. Marka adları muadilleriyle değiştirilebilir.
      </p>
    </div>
  )
}
