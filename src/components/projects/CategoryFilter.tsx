"use client";

import {
  LayoutGrid,
  Building2,
  Home,
  Building,
  Layers,
  KeyRound,
  type LucideIcon,
} from "lucide-react";

export interface CategoryOption {
  value: string
  label: string
  icon: LucideIcon
}

// Kategoriler gerçek proje verisiyle eşleşir: daire · villa · rezidans · karma
// ("completed" bir durum filtresidir → ProjectGrid içinde ele alınır)
const CATEGORIES: CategoryOption[] = [
  { value: "", label: "Tümü", icon: LayoutGrid },
  { value: "daire", label: "Daire", icon: Building2 },
  { value: "villa", label: "Villa", icon: Home },
  { value: "rezidans", label: "Rezidans", icon: Building },
  { value: "karma", label: "Karma", icon: Layers },
  { value: "completed", label: "Teslim Hazır", icon: KeyRound },
]

interface CategoryFilterProps {
  value: string
  onChange: (value: string) => void
}

/**
 * İkon destekli segmented control — kategoriler yumuşak bir "tepsi" içinde dizilir,
 * seçili olan pine dolgulu pirinç ikon rozetli bir hap olarak öne çıkar.
 */
export default function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Proje kategorisi"
      className="flex flex-wrap gap-1.5"
    >
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon
        const selected = value === cat.value
        return (
          <button
            key={cat.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(cat.value)}
            className={`group relative flex items-center gap-2 shrink-0 pl-1.5 pr-3.5 py-1.5 rounded-xl text-sm font-medium tracking-wide border transition-all duration-200 ${
              selected
                ? "bg-emerald-800 text-amber-50 border-emerald-800 shadow-[0_6px_18px_-6px_rgba(12,20,15,0.5)] ring-1 ring-amber-400/30"
                : "bg-white text-gray-600 border-gray-200 hover:text-emerald-800 hover:border-amber-300"
            }`}
          >
            <span
              className={`grid place-items-center w-7 h-7 rounded-lg transition-colors duration-200 ${
                selected
                  ? "bg-amber-400 text-emerald-950"
                  : "bg-white text-gray-400 border border-gray-200 group-hover:text-amber-600 group-hover:border-amber-300"
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
            </span>
            <span className="whitespace-nowrap">{cat.label}</span>
          </button>
        )
      })}
    </div>
  )
}
