import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  icon?: ReactNode
  sub?: string
}

export default function StatCard({ label, value, icon, sub }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-start gap-4 shadow-luxe">
      {icon && (
        <div className="w-11 h-11 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center shrink-0 ring-1 ring-amber-400/20">
          {icon}
        </div>
      )}
      <div>
        <p className="eyebrow text-gray-400">{label}</p>
        <p className="font-display text-3xl text-gray-900 mt-1">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
    </div>
  )
}
