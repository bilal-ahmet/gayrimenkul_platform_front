import type { ProjectStatus } from '@/types'

const config: Record<ProjectStatus, { label: string; className: string }> = {
  live:      { label: 'Yayında',     className: 'bg-emerald-700/90 text-amber-50 ring-emerald-900/20' },
  review:    { label: 'İncelemede',  className: 'bg-amber-100 text-amber-800 ring-amber-600/20' },
  draft:     { label: 'Taslak',      className: 'bg-gray-100 text-gray-600 ring-gray-500/15' },
  completed: { label: 'Tamamlandı',  className: 'bg-blue-100 text-blue-800 ring-blue-800/15' },
}

export default function Badge({ status }: { status: ProjectStatus }) {
  const { label, className } = config[status]
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[0.7rem] font-medium tracking-wide ring-1 backdrop-blur-sm ${className}`}>
      {label}
    </span>
  )
}
