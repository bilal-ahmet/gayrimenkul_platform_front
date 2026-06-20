"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2, Home, Building, Layers, KeyRound, Store, Briefcase,
  Hammer, Wrench, Pencil, Trees,
} from "lucide-react";
import { getUser } from "@/lib/auth";
import { saveProject } from "@/lib/projects";
import Chip from "@/components/ui/Chip";
import LocationPicker from "@/components/ui/LocationPicker";
import type { LucideIcon } from "lucide-react";
import type { ConstructionPhase } from "@/types";

// ── Ortak bileşenler ──────────────────────────────────────────────────────────

interface CatOption { value: string; label: string; icon: LucideIcon }

function CatChipGroup({ options, value, onChange }: {
  options: CatOption[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map(({ value: v, label, icon: Icon }) => {
        const active = value === v
        return (
          <button
            key={v}
            type="button"
            onClick={() => onChange(active ? "" : v)}
            className={`group flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
              active
                ? "bg-emerald-800 text-amber-50 border-emerald-800 shadow-[0_6px_18px_-6px_rgba(12,20,15,0.5)] ring-1 ring-amber-400/30"
                : "bg-white text-gray-600 border-gray-200 hover:text-emerald-800 hover:border-amber-300"
            }`}
          >
            <span className={`grid place-items-center w-7 h-7 rounded-lg transition-colors ${
              active
                ? "bg-amber-400 text-emerald-950"
                : "bg-white text-gray-400 border border-gray-200 group-hover:text-amber-600 group-hover:border-amber-300"
            }`}>
              <Icon className="w-4 h-4" strokeWidth={2} />
            </span>
            <span className="whitespace-nowrap">{label}</span>
          </button>
        )
      })}
    </div>
  )
}

function NumInput({ value, onChange, placeholder, suffix, ariaLabel, className }: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  suffix: string
  ariaLabel: string
  className?: string
}) {
  return (
    <div className={`relative min-w-0 ${className ?? "flex-1"}`}>
      <input
        type="text"
        inputMode="numeric"
        aria-label={ariaLabel}
        value={value === "" ? "" : Number(value).toLocaleString("tr-TR")}
        onChange={e => onChange(e.target.value.replace(/[^\d]/g, ""))}
        placeholder={placeholder}
        className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-gray-300 text-sm tabular-nums outline-none focus:border-emerald-500 focus:shadow-[0_0_0_2px_rgba(63,96,72,0.18)] transition-shadow"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
        {suffix}
      </span>
    </div>
  )
}

function FormSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="pt-5 border-t border-gray-200/70 first:border-t-0 first:pt-0">
      <p className="eyebrow text-emerald-700/90 mb-4">{label}</p>
      <div className="space-y-5">{children}</div>
    </div>
  )
}

function FieldRow({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-gray-400">{hint}</p>}
    </div>
  )
}

// ── Sabitler ──────────────────────────────────────────────────────────────────

const PROPERTY_CATS: CatOption[] = [
  { value: "daire",    label: "Daire",    icon: Building2 },
  { value: "villa",    label: "Villa",    icon: Home      },
  { value: "rezidans", label: "Rezidans", icon: Building  },
  { value: "karma",    label: "Karma",    icon: Layers    },
  { value: "dükkan",   label: "Dükkan",   icon: Store     },
  { value: "ofis",     label: "Ofis",     icon: Briefcase },
]

const PHASES: CatOption[] = [
  { value: "temel",     label: "Temel",           icon: Hammer   },
  { value: "kaba",      label: "Kaba İnşaat",     icon: Wrench   },
  { value: "ince",      label: "İnce İşler",      icon: Pencil   },
  { value: "dis_cephe", label: "Dış Cephe",       icon: Layers   },
  { value: "peyzaj",    label: "Peyzaj",           icon: Trees    },
  { value: "teslim",    label: "Teslim Aşaması",  icon: KeyRound },
]

const ROOM_TYPES = ["1+1", "2+1", "3+1", "4+1", "5+1", "6+1"]
const CURRENCIES = ["TRY", "USD", "EUR"] as const

// ── Sayfa ─────────────────────────────────────────────────────────────────────

export default function NewProjectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState("")

  // Temel
  const [name,       setName]       = useState("")
  const [type,       setType]       = useState("")
  // Konum
  const [city,       setCity]       = useState("")
  const [districts,  setDistricts]  = useState<string[]>([])
  // Birimler
  const [roomTypes,  setRoomTypes]  = useState<string[]>([])
  const [sqmMin,     setSqmMin]     = useState("")
  const [sqmMax,     setSqmMax]     = useState("")
  const [totalUnits, setTotalUnits] = useState("")
  // Fiyat
  const [priceStart, setPriceStart] = useState("")
  const [currency,   setCurrency]   = useState<"TRY" | "USD" | "EUR">("TRY")
  // İnşaat
  const [phase,      setPhase]      = useState("")
  const [completion, setCompletion] = useState("")
  const [delivery,   setDelivery]   = useState("")
  const [occupancy,  setOccupancy]  = useState(false)
  // Satış
  const [soldUnits,  setSoldUnits]  = useState("")

  const toggleRoom = (r: string) =>
    setRoomTypes(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!type) { setError("Mülk tipi seçmelisiniz."); return }
    if (!city) { setError("İl seçmelisiniz."); return }
    if (!name.trim()) { setError("Proje adı zorunludur."); return }
    const user = getUser()
    if (!user?.contractorId) {
      setError("Oturum bilgisi bulunamadı. Lütfen tekrar giriş yapın.")
      return
    }
    setError("")
    setLoading(true)
    setTimeout(() => {
      saveProject({
        name, city, district: districts[0] ?? "", type,
        priceStart, currency,
        sqmMin, sqmMax,
        roomTypes,
        totalUnits, soldUnits,
        phase: phase as ConstructionPhase,
        completion, delivery,
        occupancyReady: occupancy,
      }, user.contractorId!)
      setLoading(false)
      router.push("/dashboard/projects")
    }, 800)
  }

  return (
    <main className="p-6 md:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-gray-900">Yeni Proje Ekle</h1>
        <p className="text-gray-500 text-sm mt-1">Projeniz incelendikten sonra yayına alınır.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">

          {/* 1 — Temel Bilgiler */}
          <FormSection label="Temel Bilgiler">
            <FieldRow label="Proje Adı">
              <input
                required
                placeholder="Örn: Panorama Residence"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-500 focus:shadow-[0_0_0_2px_rgba(63,96,72,0.18)] transition-shadow"
              />
            </FieldRow>

            <FieldRow label="Mülk Tipi">
              <CatChipGroup options={PROPERTY_CATS} value={type} onChange={setType} />
            </FieldRow>
          </FormSection>

          {/* 2 — Konum */}
          <FormSection label="Konum">
            <FieldRow label="İl ve İlçe">
              <LocationPicker
                value={{ city, districts }}
                onChange={({ city: c, districts: d }) => { setCity(c); setDistricts(d) }}
              />
            </FieldRow>
          </FormSection>

          {/* 3 — Birimler & Alan */}
          <FormSection label="Birimler & Alan">
            <FieldRow label="Oda Tipleri">
              <div className="flex flex-wrap gap-2">
                {ROOM_TYPES.map(r => (
                  <Chip key={r} label={r} selected={roomTypes.includes(r)} onClick={() => toggleRoom(r)} />
                ))}
              </div>
            </FieldRow>

            <FieldRow label="Kullanım Alanı (m²)">
              <div className="flex items-center gap-2">
                <NumInput value={sqmMin} onChange={setSqmMin} placeholder="min" suffix="m²" ariaLabel="Alan minimum" />
                <span className="shrink-0 text-gray-300">–</span>
                <NumInput value={sqmMax} onChange={setSqmMax} placeholder="max" suffix="m²" ariaLabel="Alan maksimum" />
              </div>
            </FieldRow>

            <FieldRow label="Toplam Konut Sayısı">
              <NumInput value={totalUnits} onChange={setTotalUnits} placeholder="Örn: 120" suffix="konut" ariaLabel="Toplam konut" className="max-w-xs" />
            </FieldRow>
          </FormSection>

          {/* 4 — Fiyat */}
          <FormSection label="Fiyat">
            <FieldRow label="Başlangıç Fiyatı">
              <div className="flex gap-2">
                <NumInput
                  value={priceStart}
                  onChange={setPriceStart}
                  placeholder="4.500.000"
                  suffix={currency}
                  ariaLabel="Başlangıç fiyatı"
                />
                <div className="flex rounded-xl border border-gray-300 overflow-hidden shrink-0">
                  {CURRENCIES.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCurrency(c)}
                      className={`px-3 py-2.5 text-sm font-medium transition-colors ${
                        currency === c
                          ? "bg-emerald-800 text-amber-50"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </FieldRow>
          </FormSection>

          {/* 5 — İnşaat Durumu */}
          <FormSection label="İnşaat Durumu">
            <FieldRow label="İnşaat Aşaması">
              <CatChipGroup options={PHASES} value={phase} onChange={setPhase} />
            </FieldRow>

            <FieldRow label="Tamamlanma Oranı">
              <NumInput value={completion} onChange={setCompletion} placeholder="65" suffix="%" ariaLabel="Tamamlanma %" className="max-w-xs" />
            </FieldRow>

            <FieldRow label="Tahmini Teslim">
              <input
                placeholder="Örn: Q3 2026"
                value={delivery}
                onChange={e => setDelivery(e.target.value)}
                className="w-full max-w-xs px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-500 focus:shadow-[0_0_0_2px_rgba(63,96,72,0.18)] transition-shadow"
              />
            </FieldRow>

            <FieldRow label="İskan Durumu">
              <label className="flex items-center gap-3 cursor-pointer w-fit select-none">
                <button
                  type="button"
                  role="switch"
                  aria-checked={occupancy}
                  onClick={() => setOccupancy(p => !p)}
                  className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${
                    occupancy ? "bg-emerald-700" : "bg-gray-200"
                  }`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    occupancy ? "translate-x-4" : "translate-x-0"
                  }`} />
                </button>
                <span className="text-sm text-gray-700">İskan hazır</span>
              </label>
            </FieldRow>
          </FormSection>

          {/* 6 — Satış Durumu */}
          <FormSection label="Satış Durumu">
            <FieldRow
              label="Satılan Konut Sayısı"
              hint={totalUnits ? `Toplam ${Number(totalUnits).toLocaleString("tr-TR")} konutan` : undefined}
            >
              <NumInput value={soldUnits} onChange={setSoldUnits} placeholder="Örn: 45" suffix="konut" ariaLabel="Satılan konut" className="max-w-xs" />
            </FieldRow>
          </FormSection>

        </div>

        {error && (
          <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</p>
        )}

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 border border-gray-300 text-gray-700 text-sm font-semibold py-3 rounded-full hover:bg-gray-50 transition-colors"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-amber-50 text-sm font-semibold py-3 rounded-full ring-1 ring-amber-400/25 transition-colors"
          >
            {loading ? "Kaydediliyor…" : "Projeyi Yayına Gönder"}
          </button>
        </div>
      </form>
    </main>
  )
}
