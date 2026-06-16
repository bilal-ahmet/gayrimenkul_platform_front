"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Search, X, Check, ChevronDown } from "lucide-react";
import Chip from "@/components/ui/Chip";
import {
  REGIONS,
  PROVINCES,
  provincesByRegion,
  districtsOf,
  type RegionKey,
  type Province,
} from "@/data/turkey-geo";

export interface LocationValue {
  city: string
  districts: string[]
}

interface LocationPickerProps {
  value: LocationValue
  onChange: (v: LocationValue) => void
  /** İl adı → aktif proje sayısı (rozet için, opsiyonel) */
  counts?: Record<string, number>
}

/** Türkçe-duyarsız normalizasyon (arama eşleşmesi için) */
const norm = (s: string) =>
  s
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")

export default function LocationPicker({ value, onChange, counts }: LocationPickerProps) {
  const [open, setOpen] = useState(false)
  const [region, setRegion] = useState<RegionKey>("marmara")
  const [query, setQuery] = useState("")
  const rootRef = useRef<HTMLDivElement>(null)

  // Dış tıklama + Escape ile kapanma
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  // Arama varsa tüm illerde düz liste; yoksa aktif bölge
  const visibleProvinces: Province[] = useMemo(() => {
    const q = norm(query.trim())
    if (q) {
      return PROVINCES
        .filter(p => norm(p.name).includes(q))
        .sort((a, b) => a.name.localeCompare(b.name, "tr"))
    }
    return provincesByRegion(region)
  }, [query, region])

  const districts = value.city ? districtsOf(value.city) : []

  const selectCity = (name: string) => {
    if (value.city === name) {
      onChange({ city: "", districts: [] })       // aynı ile tekrar tıkla → temizle
    } else {
      onChange({ city: name, districts: [] })      // il değişti → ilçeler sıfırlanır
    }
  }

  const toggleDistrict = (d: string) => {
    const next = value.districts.includes(d)
      ? value.districts.filter(x => x !== d)
      : [...value.districts, d]
    onChange({ city: value.city, districts: next })
  }

  const clearAll = () => { onChange({ city: "", districts: [] }); setQuery("") }

  // Tetikleyici özet metni
  const summary = value.city
    ? value.districts.length > 0
      ? `${value.city} · ${value.districts.length} ilçe`
      : value.city
    : "Konum Seç"

  return (
    <div ref={rootRef} className="relative">
      {/* Tetikleyici */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 pl-3 pr-2 py-2 rounded-xl border text-sm transition-colors ${
          value.city
            ? "border-emerald-600 bg-emerald-50 text-emerald-800"
            : "border-gray-300 bg-white text-gray-600 hover:border-emerald-400"
        }`}
      >
        <MapPin className="w-4 h-4 shrink-0" />
        <span className="font-medium">{summary}</span>
        {value.city ? (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); clearAll() }}
            className="ml-1 p-0.5 rounded-full hover:bg-emerald-200/60"
            aria-label="Konumu temizle"
          >
            <X className="w-3.5 h-3.5" />
          </span>
        ) : (
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="absolute left-0 top-full mt-2 z-50 w-[min(92vw,520px)] bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
          {/* İl arama */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="İl ara… (örn. İstanbul)"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Bölge sekmeleri (arama boşken) */}
          {!query.trim() && (
            <div className="flex gap-1.5 px-3 py-2 overflow-x-auto border-b border-gray-100">
              {REGIONS.map(r => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setRegion(r.key)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    region === r.key
                      ? "bg-emerald-700 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          )}

          {/* İl listesi */}
          <div className="max-h-56 overflow-y-auto p-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {visibleProvinces.map(p => {
                const active = value.city === p.name
                const count = counts?.[p.name]
                return (
                  <button
                    key={p.plate}
                    type="button"
                    onClick={() => selectCity(p.name)}
                    className={`flex items-center justify-between gap-1 px-3 py-2 rounded-lg text-sm text-left transition-colors border ${
                      active
                        ? "bg-emerald-700 text-white border-emerald-700"
                        : count
                          ? "bg-white text-gray-800 border-emerald-200 hover:border-emerald-400"
                          : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300"
                    }`}
                  >
                    <span className="truncate">{p.name}</span>
                    {count ? (
                      <span
                        className={`shrink-0 text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${
                          active ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {count}
                      </span>
                    ) : active ? (
                      <Check className="w-4 h-4 shrink-0" />
                    ) : null}
                  </button>
                )
              })}
              {visibleProvinces.length === 0 && (
                <p className="col-span-full text-center text-sm text-gray-400 py-4">İl bulunamadı</p>
              )}
            </div>
          </div>

          {/* İlçeler (il seçiliyse) */}
          {value.city && districts.length > 0 && (
            <div className="border-t border-gray-100 p-3">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                {value.city} ilçeleri <span className="text-gray-400">(çoklu seçim)</span>
              </p>
              <div className="max-h-40 overflow-y-auto flex flex-wrap gap-1.5">
                {districts.map(d => (
                  <Chip
                    key={d}
                    label={d}
                    selected={value.districts.includes(d)}
                    onClick={() => toggleDistrict(d)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Alt bar */}
          <div className="flex items-center justify-between px-3 py-2.5 border-t border-gray-100 bg-gray-50">
            <button
              type="button"
              onClick={clearAll}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Temizle
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-1.5 rounded-lg transition-colors"
            >
              Tamam
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
