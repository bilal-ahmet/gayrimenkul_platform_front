import type { ProjectStatus } from '@/types'

const config: Record<ProjectStatus, { label: string; className: string }> = {
  live:      { label: 'Yayında',     className: 'bg-emerald-100 text-emerald-800' },
  review:    { label: 'İncelemede',  className: 'bg-amber-100 text-amber-800' },
  draft:     { label: 'Taslak',      className: 'bg-gray-100 text-gray-600' },
  completed: { label: 'Tamamlandı',  className: 'bg-blue-100 text-blue-800' },
}

export default function Badge({ status }: { status: ProjectStatus }) {
  const { label, className } = config[status]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}
