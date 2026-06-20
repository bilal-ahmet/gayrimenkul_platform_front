"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/types";
import ProjectCard from "./ProjectCard";
import FilterBar, { type FilterState, EMPTY_FILTER } from "./FilterBar";
import type { Facets } from "./AdvancedFilters";
import { contractors } from "@/data/contractors";

// Firma adını id'den bul (lookup haritası)
const contractorMap = Object.fromEntries(contractors.map(c => [c.id, c.name]))

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<FilterState>(EMPTY_FILTER)

  // İl başına proje sayısı (LocationPicker rozetleri için)
  const counts = useMemo(() => {
    const acc: Record<string, number> = {}
    for (const p of projects) acc[p.location.city] = (acc[p.location.city] ?? 0) + 1
    return acc
  }, [projects])

  // Seçili kategoriye göre oda/alan/fiyat seçenek aralıkları
  const facets: Facets = useMemo(() => {
    const inCat = projects.filter(p =>
      filter.type === '' ? true
      : filter.type === 'completed' ? p.status === 'completed'
      : p.type === filter.type
    )
    const rooms = Array.from(new Set(inCat.flatMap(p => p.roomTypes)))
      .sort((a, b) => a.localeCompare(b, 'tr', { numeric: true }))
    const prices = inCat.map(p => p.priceStart)
    const aMin = inCat.map(p => p.sqmRange.min)
    const aMax = inCat.map(p => p.sqmRange.max)
    return {
      rooms,
      priceMin: prices.length ? Math.min(...prices) : 0,
      priceMax: prices.length ? Math.max(...prices) : 0,
      areaMin: aMin.length ? Math.min(...aMin) : 0,
      areaMax: aMax.length ? Math.max(...aMax) : 0,
    }
  }, [projects, filter.type])

  const filtered = projects.filter((p) => {
    if (filter.type === 'completed' && p.status !== 'completed') return false
    if (filter.type && filter.type !== 'completed' && p.type !== filter.type) return false
    if (filter.city && p.location.city !== filter.city) return false
    if (filter.districts.length && !filter.districts.includes(p.location.district)) return false
    // Oda sayısı — projenin oda tiplerinden en az biri seçilenlerle eşleşmeli
    if (filter.rooms.length && !filter.rooms.some(r => p.roomTypes.includes(r))) return false
    // Alan — proje m² aralığı, seçilen aralıkla kesişmeli
    if (filter.minArea != null && p.sqmRange.max < filter.minArea) return false
    if (filter.maxArea != null && p.sqmRange.min > filter.maxArea) return false
    // Başlangıç fiyatı
    if (filter.minPrice != null && p.priceStart < filter.minPrice) return false
    if (filter.maxPrice != null && p.priceStart > filter.maxPrice) return false
    if (filter.search) {
      const q = filter.search.toLowerCase()
      const firma = contractorMap[p.contractorId] ?? ''
      const searchable = [p.name, p.location.city, p.location.district, firma].join(' ').toLowerCase()
      if (!searchable.includes(q)) return false
    }
    return true
  })

  return (
    <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-8 lg:items-start">
      {/* Filtre — lg+ : sola yanaşan ince sticky sidebar; mobilde üstte blok */}
      <aside className="mb-6 lg:mb-0 lg:sticky lg:top-24 animate-dock">
        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm shadow-emerald-950/[0.03]">
          <FilterBar
            filter={filter}
            onChange={setFilter}
            counts={counts}
            facets={facets}
            resultCount={filtered.length}
          />
        </div>
      </aside>

      {/* Proje ızgarası */}
      <div className="min-w-0">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-medium">Sonuç bulunamadı</p>
            <p className="text-sm mt-1">Filtrelerinizi değiştirmeyi deneyin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
