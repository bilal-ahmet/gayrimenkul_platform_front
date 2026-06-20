"use client";

import Chip from "@/components/ui/Chip";

export interface Facets {
  /** Seçili kategoride veride bulunan oda tipleri (örn. villa → 4+1…7+1) */
  rooms: string[]
  priceMin: number
  priceMax: number
  areaMin: number
  areaMax: number
}

interface AdvancedFiltersProps {
  category: string
  facets: Facets
  rooms: string[]
  minArea: number | null
  maxArea: number | null
  minPrice: number | null
  maxPrice: number | null
  onChange: (patch: Partial<AdvancedValue>) => void
}

export type AdvancedValue = {
  rooms: string[]
  minArea: number | null
  maxArea: number | null
  minPrice: number | null
  maxPrice: number | null
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="pt-4 border-t border-gray-200/70 first:border-t-0 first:pt-0">
      <p className="eyebrow text-emerald-700/90 mb-2.5">{label}</p>
      {children}
    </div>
  )
}

/** Binlik ayraçlı (tr-TR) gösterimli, yalnızca rakam kabul eden min/max kutusu */
function NumberField({
  value,
  onChange,
  placeholder,
  suffix,
  ariaLabel,
}: {
  value: number | null
  onChange: (v: number | null) => void
  placeholder: string
  suffix: string
  ariaLabel: string
}) {
  return (
    <div className="relative flex-1 min-w-0">
      <input
        type="text"
        inputMode="numeric"
        aria-label={ariaLabel}
        value={value == null ? "" : value.toLocaleString("tr-TR")}
        onChange={(e) => {
          const digits = e.target.value.replace(/[^\d]/g, "")
          onChange(digits === "" ? null : Number(digits))
        }}
        placeholder={placeholder}
        className="w-full pl-3 pr-9 py-2 rounded-lg border border-gray-300 text-sm tabular-nums outline-none focus:border-emerald-500 focus:shadow-[0_0_0_2px_rgba(63,96,72,0.18)] transition-shadow"
      />
      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
        {suffix}
      </span>
    </div>
  )
}

function RangeRow({
  min,
  max,
  onMin,
  onMax,
  minPlaceholder,
  maxPlaceholder,
  suffix,
  label,
}: {
  min: number | null
  max: number | null
  onMin: (v: number | null) => void
  onMax: (v: number | null) => void
  minPlaceholder: string
  maxPlaceholder: string
  suffix: string
  label: string
}) {
  return (
    <div className="flex items-center gap-2">
      <NumberField value={min} onChange={onMin} placeholder={minPlaceholder} suffix={suffix} ariaLabel={`${label} en az`} />
      <span className="shrink-0 text-gray-300">–</span>
      <NumberField value={max} onChange={onMax} placeholder={maxPlaceholder} suffix={suffix} ariaLabel={`${label} en fazla`} />
    </div>
  )
}

export default function AdvancedFilters({
  facets,
  rooms,
  minArea,
  maxArea,
  minPrice,
  maxPrice,
  onChange,
}: AdvancedFiltersProps) {
  const toggleRoom = (r: string) =>
    onChange({ rooms: rooms.includes(r) ? rooms.filter((x) => x !== r) : [...rooms, r] })

  return (
    <div className="flex flex-col gap-4">
      {facets.rooms.length > 0 && (
        <Section label="Oda Sayısı">
          <div className="flex flex-wrap gap-2">
            {facets.rooms.map((r) => (
              <Chip key={r} label={r} selected={rooms.includes(r)} onClick={() => toggleRoom(r)} />
            ))}
          </div>
        </Section>
      )}

      <Section label="Alan (m²)">
        <RangeRow
          label="Alan"
          suffix="m²"
          min={minArea}
          max={maxArea}
          onMin={(v) => onChange({ minArea: v })}
          onMax={(v) => onChange({ maxArea: v })}
          minPlaceholder="min"
          maxPlaceholder="max"
        />
      </Section>

      <Section label="Başlangıç Fiyatı (₺)">
        <RangeRow
          label="Fiyat"
          suffix="₺"
          min={minPrice}
          max={maxPrice}
          onMin={(v) => onChange({ minPrice: v })}
          onMax={(v) => onChange({ maxPrice: v })}
          minPlaceholder="min"
          maxPlaceholder="max"
        />
      </Section>
    </div>
  )
}
