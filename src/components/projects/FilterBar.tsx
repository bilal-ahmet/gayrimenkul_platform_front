"use client";

import { Search } from "lucide-react";
import Chip from "@/components/ui/Chip";

export type FilterState = {
  type: string
  city: string
  search: string
}

const TYPE_OPTIONS = [
  { value: '', label: 'Tümü' },
  { value: 'daire', label: 'Daire' },
  { value: 'villa', label: 'Villa' },
  { value: 'dükkan', label: 'Dükkan-Ofis' },
  { value: 'completed', label: 'Teslim Hazır' },
]

const CITIES = ['', 'İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Kocaeli']

interface FilterBarProps {
  filter: FilterState
  onChange: (f: FilterState) => void
}

export default function FilterBar({ filter, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-wrap">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Proje, firma, il veya ilçe ara..."
          value={filter.search}
          onChange={(e) => onChange({ ...filter, search: e.target.value })}
          className="pl-9 pr-4 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-72"
        />
      </div>

      {/* Type chips */}
      <div className="flex flex-wrap gap-2">
        {TYPE_OPTIONS.map((opt) => (
          <Chip
            key={opt.value}
            label={opt.label}
            selected={filter.type === opt.value}
            onClick={() => onChange({ ...filter, type: opt.value })}
          />
        ))}
      </div>

      {/* City select */}
      <select
        value={filter.city}
        onChange={(e) => onChange({ ...filter, city: e.target.value })}
        className="px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
      >
        <option value="">Tüm Şehirler</option>
        {CITIES.filter(Boolean).map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  )
}
