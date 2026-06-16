"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/types";
import ProjectCard from "./ProjectCard";
import FilterBar, { type FilterState } from "./FilterBar";
import { contractors } from "@/data/contractors";

// Firma adını id'den bul (lookup haritası)
const contractorMap = Object.fromEntries(contractors.map(c => [c.id, c.name]))

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<FilterState>({ type: '', city: '', districts: [], search: '' })

  // İl başına proje sayısı (LocationPicker rozetleri için)
  const counts = useMemo(() => {
    const acc: Record<string, number> = {}
    for (const p of projects) acc[p.location.city] = (acc[p.location.city] ?? 0) + 1
    return acc
  }, [projects])

  const filtered = projects.filter((p) => {
    if (filter.type === 'completed' && p.status !== 'completed') return false
    if (filter.type && filter.type !== 'completed' && p.type !== filter.type) return false
    if (filter.city && p.location.city !== filter.city) return false
    if (filter.districts.length && !filter.districts.includes(p.location.district)) return false
    if (filter.search) {
      const q = filter.search.toLowerCase()
      const firma = contractorMap[p.contractorId] ?? ''
      const searchable = [p.name, p.location.city, p.location.district, firma].join(' ').toLowerCase()
      if (!searchable.includes(q)) return false
    }
    return true
  })

  return (
    <div>
      <FilterBar filter={filter} onChange={setFilter} counts={counts} />
      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-medium">Sonuç bulunamadı</p>
            <p className="text-sm mt-1">Filtrelerinizi değiştirmeyi deneyin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
