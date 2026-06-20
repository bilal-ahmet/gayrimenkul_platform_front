"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import LocationPicker from "@/components/ui/LocationPicker";
import CategoryFilter from "./CategoryFilter";
import AdvancedFilters, { type Facets } from "./AdvancedFilters";

export type FilterState = {
  type: string
  city: string
  districts: string[]
  search: string
  rooms: string[]
  minArea: number | null
  maxArea: number | null
  minPrice: number | null
  maxPrice: number | null
}

export const EMPTY_FILTER: FilterState = {
  type: "", city: "", districts: [], search: "",
  rooms: [], minArea: null, maxArea: null, minPrice: null, maxPrice: null,
}

interface FilterBarProps {
  filter: FilterState
  onChange: (f: FilterState) => void
  /** İl adı → aktif proje sayısı (LocationPicker rozetleri için) */
  counts?: Record<string, number>
  /** Seçili kategoriye göre oda/alan/fiyat seçenek aralıkları */
  facets: Facets
  /** O an listelenen proje sayısı */
  resultCount: number
}

const isActive = (f: FilterState) =>
  !!(f.type || f.city || f.districts.length || f.search || f.rooms.length ||
    f.minArea != null || f.maxArea != null || f.minPrice != null || f.maxPrice != null)

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow text-emerald-700/90 mb-2.5">{children}</p>
}

export default function FilterBar({ filter, onChange, counts, facets, resultCount }: FilterBarProps) {
  const showAdvanced = filter.type !== ""
  const active = isActive(filter)

  // Kategori değişince ona özel seçimler (oda/alan/fiyat) sıfırlanır
  const setCategory = (type: string) =>
    onChange({ ...filter, type, rooms: [], minArea: null, maxArea: null, minPrice: null, maxPrice: null })

  return (
    <div className="flex flex-col">
      {/* Başlık */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200/70">
        <h3 className="flex items-center gap-2 font-display text-lg text-gray-900">
          <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
          Filtrele
        </h3>
        {active && (
          <button
            type="button"
            onClick={() => onChange(EMPTY_FILTER)}
            className="text-xs font-medium text-gray-400 hover:text-emerald-700 transition-colors"
          >
            Temizle
          </button>
        )}
      </div>

      {/* Arama */}
      <div className="pt-4">
        <FieldLabel>Ara</FieldLabel>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Proje, firma, il veya ilçe..."
            value={filter.search}
            onChange={(e) => onChange({ ...filter, search: e.target.value })}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Konum */}
      <div className="pt-4 mt-4 border-t border-gray-200/70">
        <FieldLabel>Konum</FieldLabel>
        <LocationPicker
          value={{ city: filter.city, districts: filter.districts }}
          onChange={(loc) => onChange({ ...filter, ...loc })}
          counts={counts}
        />
      </div>

      {/* Kategori */}
      <div className="pt-4 mt-4 border-t border-gray-200/70">
        <FieldLabel>Kategori</FieldLabel>
        <CategoryFilter value={filter.type} onChange={setCategory} />
      </div>

      {/* Gelişmiş filtreler — kategori seçilince yumuşakça açılır */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
          showAdvanced ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-4 mt-4 border-t border-gray-200/70">
            <AdvancedFilters
              category={filter.type}
              facets={facets}
              rooms={filter.rooms}
              minArea={filter.minArea}
              maxArea={filter.maxArea}
              minPrice={filter.minPrice}
              maxPrice={filter.maxPrice}
              onChange={(patch) => onChange({ ...filter, ...patch })}
            />
          </div>
        </div>
      </div>

      {/* Sonuç sayısı */}
      <p className="pt-4 mt-4 border-t border-gray-200/70 text-xs text-gray-500">
        <span className="font-semibold text-emerald-800">{resultCount}</span> proje listeleniyor
      </p>
    </div>
  )
}
