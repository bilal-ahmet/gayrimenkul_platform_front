"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Eye, Save, Plus, Trash2, ChevronDown,
  Building2, Home, Building, Layers, KeyRound, Store, Briefcase,
  Hammer, Wrench, Pencil, Trees,
  ImagePlus, X, Check,
} from "lucide-react";
import Chip from "@/components/ui/Chip";
import LocationPicker from "@/components/ui/LocationPicker";
import Badge from "@/components/ui/Badge";
import { getAllProjects, updateProject } from "@/lib/projects";
import { buildPhaseDetails, PHASE_LABELS, PHASE_ORDER, STANDARD_TECH_SPECS } from "@/data/projectContent";
import type {
  ConstructionPhase, PhaseDetail, Project, ProjectStatus,
  PropertyType, TechSpecGroup, UnitType,
} from "@/types";
import type { LucideIcon } from "lucide-react";

// ── Yardımcı bileşenler (new/page.tsx ile aynı tasarım dili) ─────────────────

interface CatOpt { value: string; label: string; icon: LucideIcon }

function CatChips({ options, value, onChange }: {
  options: CatOpt[]; value: string; onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map(({ value: v, label, icon: Icon }) => {
        const on = value === v
        return (
          <button key={v} type="button" onClick={() => onChange(on ? "" : v)}
            className={`group flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
              on ? "bg-emerald-800 text-amber-50 border-emerald-800 shadow-[0_6px_18px_-6px_rgba(12,20,15,0.5)] ring-1 ring-amber-400/30"
                 : "bg-white text-gray-600 border-gray-200 hover:text-emerald-800 hover:border-amber-300"}`}>
            <span className={`grid place-items-center w-7 h-7 rounded-lg transition-colors ${
              on ? "bg-amber-400 text-emerald-950"
                 : "bg-white text-gray-400 border border-gray-200 group-hover:text-amber-600 group-hover:border-amber-300"}`}>
              <Icon className="w-4 h-4" strokeWidth={2} />
            </span>
            <span className="whitespace-nowrap">{label}</span>
          </button>
        )
      })}
    </div>
  )
}

function NumInput({ value, onChange, placeholder, suffix, className }: {
  value: string; onChange: (v: string) => void
  placeholder: string; suffix: string; className?: string
}) {
  return (
    <div className={`relative min-w-0 ${className ?? "flex-1"}`}>
      <input type="text" inputMode="numeric"
        value={value === "" ? "" : Number(value).toLocaleString("tr-TR")}
        onChange={e => onChange(e.target.value.replace(/[^\d]/g, ""))}
        placeholder={placeholder}
        className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-gray-300 text-sm tabular-nums outline-none focus:border-emerald-500 focus:shadow-[0_0_0_2px_rgba(63,96,72,0.18)] transition-shadow"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">{suffix}</span>
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

function Sec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="pt-5 border-t border-gray-200/70 first:border-t-0 first:pt-0">
      <p className="eyebrow text-emerald-700/90 mb-4">{label}</p>
      <div className="space-y-5">{children}</div>
    </div>
  )
}

// ── Sabitler ──────────────────────────────────────────────────────────────────

const PROP_CATS: CatOpt[] = [
  { value: "daire",    label: "Daire",    icon: Building2 },
  { value: "villa",    label: "Villa",    icon: Home      },
  { value: "rezidans", label: "Rezidans", icon: Building  },
  { value: "karma",    label: "Karma",    icon: Layers    },
  { value: "dükkan",   label: "Dükkan",   icon: Store     },
  { value: "ofis",     label: "Ofis",     icon: Briefcase },
]

const PHASE_CATS: CatOpt[] = [
  { value: "temel",     label: "Temel",          icon: Hammer   },
  { value: "kaba",      label: "Kaba İnşaat",    icon: Wrench   },
  { value: "ince",      label: "İnce İşler",     icon: Pencil   },
  { value: "dis_cephe", label: "Dış Cephe",      icon: Layers   },
  { value: "peyzaj",    label: "Peyzaj",          icon: Trees    },
  { value: "teslim",    label: "Teslim Aşaması", icon: KeyRound },
]

const ROOM_TYPES = ["1+1", "2+1", "3+1", "4+1", "5+1", "6+1"]
const CURRENCIES = ["TRY", "USD", "EUR"] as const

const STATUS_OPTS: { value: ProjectStatus; label: string }[] = [
  { value: "draft",     label: "Taslak"      },
  { value: "review",    label: "İncelemede"  },
  { value: "live",      label: "Yayında"     },
  { value: "completed", label: "Teslim Edildi" },
]

type Tab = "genel" | "insaat" | "birimler" | "sartname"

// ── Sayfa ─────────────────────────────────────────────────────────────────────

export default function ProjectManagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()

  const [project,  setProject]  = useState<Project | null>(null)
  const [missing,  setMissing]  = useState(false)
  const [tab,      setTab]      = useState<Tab>("genel")
  const [saving,   setSaving]   = useState(false)
  const [saved,    setSaved]    = useState(false)

  // ── Genel bilgiler ───────────────────────────────────────────────────────────
  const [name,       setName]       = useState("")
  const [type,       setType]       = useState("")
  const [city,       setCity]       = useState("")
  const [districts,  setDistricts]  = useState<string[]>([])
  const [roomTypes,  setRoomTypes]  = useState<string[]>([])
  const [sqmMin,     setSqmMin]     = useState("")
  const [sqmMax,     setSqmMax]     = useState("")
  const [totalUnits, setTotalUnits] = useState("")
  const [soldUnits,  setSoldUnits]  = useState("")
  const [priceStart, setPriceStart] = useState("")
  const [currency,   setCurrency]   = useState<"TRY" | "USD" | "EUR">("TRY")
  const [phase,      setPhase]      = useState("")
  const [completion, setCompletion] = useState("")
  const [delivery,   setDelivery]   = useState("")
  const [occupancy,  setOccupancy]  = useState(false)
  const [status,     setStatus]     = useState<ProjectStatus>("review")

  // ── İnşaat aşamaları ────────────────────────────────────────────────────────
  const [phaseDetails, setPhaseDetails] = useState<PhaseDetail[]>([])
  const [openPhase,    setOpenPhase]    = useState<number>(0)

  // ── Bağımsız bölümler ────────────────────────────────────────────────────────
  const [unitTypes,    setUnitTypes]    = useState<UnitType[]>([])
  const [openUnit,     setOpenUnit]     = useState<number | null>(null)
  const [addingUnit,   setAddingUnit]   = useState(false)
  const [newUnit,      setNewUnit]      = useState<UnitType>({
    oda: "", m2: { min: 0, max: 0 }, count: 0, available: 0, sold: 0, priceFrom: 0
  })

  // ── Teknik şartname ───────────────────────────────────────────────────────────
  const [techSpecs, setTechSpecs] = useState<TechSpecGroup[]>([])

  // ── Başlatma ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const all = getAllProjects()
    const p = all.find(x => x.id === id)
    if (!p) { setMissing(true); return }
    setProject(p)
    setName(p.name)
    setType(p.type)
    setCity(p.location.city)
    setDistricts(p.location.district ? [p.location.district] : [])
    setRoomTypes(p.roomTypes)
    setSqmMin(String(p.sqmRange.min || ""))
    setSqmMax(String(p.sqmRange.max || ""))
    setTotalUnits(String(p.totalUnits || ""))
    setSoldUnits(String(p.soldUnits || ""))
    setPriceStart(String(p.priceStart || ""))
    setCurrency(p.currency as "TRY" | "USD" | "EUR" || "TRY")
    setPhase(p.phase)
    setCompletion(String(p.completionPercent || ""))
    setDelivery(p.estimatedDelivery || "")
    setOccupancy(p.occupancyReady)
    setStatus(p.status)
    setPhaseDetails(p.phaseDetails ?? buildPhaseDetails(p.phase, p.completionPercent))
    setUnitTypes(p.unitTypes ?? [])
    setTechSpecs(p.techSpecs ?? [])
  }, [id])

  // ── Kaydet ───────────────────────────────────────────────────────────────────
  const handleSave = () => {
    setSaving(true)
    updateProject(id, {
      name,
      type: type as PropertyType,
      location: { city, district: districts[0] ?? "" },
      roomTypes,
      sqmRange: { min: Number(sqmMin) || 0, max: Number(sqmMax) || 0 },
      totalUnits: Number(totalUnits) || 0,
      soldUnits: Number(soldUnits) || 0,
      priceStart: Number(priceStart) || 0,
      currency: currency as "TRY" | "USD" | "EUR",
      phase: phase as ConstructionPhase,
      completionPercent: Number(completion) || 0,
      estimatedDelivery: delivery,
      occupancyReady: occupancy,
      status,
      phaseDetails,
      unitTypes,
      techSpecs,
    })
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000) }, 600)
  }

  // ── İnşaat yardımcıları ───────────────────────────────────────────────────────
  const updatePhasePercent = (idx: number, val: string) => {
    setPhaseDetails(prev => prev.map((p, i) =>
      i === idx ? { ...p, percent: Math.min(100, Math.max(0, Number(val) || 0)) } : p
    ))
  }

  const addPhotoUrl = (phaseIdx: number, stepIdx: number, url: string) => {
    if (!url.trim()) return
    setPhaseDetails(prev => prev.map((p, pi) =>
      pi !== phaseIdx ? p : {
        ...p,
        steps: p.steps.map((s, si) =>
          si !== stepIdx ? s : { ...s, images: [...s.images, url.trim()] }
        )
      }
    ))
  }

  const removePhotoUrl = (phaseIdx: number, stepIdx: number, imgIdx: number) => {
    setPhaseDetails(prev => prev.map((p, pi) =>
      pi !== phaseIdx ? p : {
        ...p,
        steps: p.steps.map((s, si) =>
          si !== stepIdx ? s : { ...s, images: s.images.filter((_, ii) => ii !== imgIdx) }
        )
      }
    ))
  }

  // ── Birim yardımcıları ────────────────────────────────────────────────────────
  const deleteUnit = (idx: number) => setUnitTypes(prev => prev.filter((_, i) => i !== idx))
  const addUnit = () => {
    if (!newUnit.oda) return
    setUnitTypes(prev => [...prev, newUnit])
    setNewUnit({ oda: "", m2: { min: 0, max: 0 }, count: 0, available: 0, sold: 0, priceFrom: 0 })
    setAddingUnit(false)
  }
  const updateUnit = (idx: number, patch: Partial<UnitType>) =>
    setUnitTypes(prev => prev.map((u, i) => i === idx ? { ...u, ...patch } : u))

  // ── Şartname yardımcıları ─────────────────────────────────────────────────────
  const addSpecGroup = () => setTechSpecs(prev => [...prev, { category: "Yeni Grup", items: [] }])
  const deleteSpecGroup = (gi: number) => setTechSpecs(prev => prev.filter((_, i) => i !== gi))
  const updateSpecCat = (gi: number, val: string) =>
    setTechSpecs(prev => prev.map((g, i) => i === gi ? { ...g, category: val } : g))
  const addSpecItem = (gi: number) =>
    setTechSpecs(prev => prev.map((g, i) =>
      i === gi ? { ...g, items: [...g.items, { label: "", value: "" }] } : g
    ))
  const deleteSpecItem = (gi: number, ii: number) =>
    setTechSpecs(prev => prev.map((g, i) =>
      i === gi ? { ...g, items: g.items.filter((_, j) => j !== ii) } : g
    ))
  const updateSpecItem = (gi: number, ii: number, key: "label" | "value", val: string) =>
    setTechSpecs(prev => prev.map((g, i) =>
      i === gi ? { ...g, items: g.items.map((it, j) => j === ii ? { ...it, [key]: val } : it) } : g
    ))

  // ── Render ────────────────────────────────────────────────────────────────────

  if (missing) {
    return (
      <main className="p-8 text-center">
        <p className="text-gray-500 text-sm">Proje bulunamadı.</p>
        <Link href="/dashboard/projects" className="mt-4 inline-flex text-sm text-emerald-700 hover:underline">
          ← Projelere dön
        </Link>
      </main>
    )
  }

  if (!project) {
    return <main className="p-8"><div className="h-8 w-48 bg-gray-100 rounded-xl animate-pulse" /></main>
  }

  const TABS: { id: Tab; label: string }[] = [
    { id: "genel",    label: "Genel Bilgiler"    },
    { id: "insaat",   label: "İnşaat Aşamaları"  },
    { id: "birimler", label: "Bağımsız Bölümler" },
    { id: "sartname", label: "Teknik Şartname"   },
  ]

  return (
    <main className="p-6 md:p-8 max-w-4xl">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Link href="/dashboard/projects" className="shrink-0 p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="min-w-0">
            <h1 className="font-display text-2xl text-gray-900 truncate">{project.name}</h1>
            <p className="text-xs text-gray-400 mt-0.5">{project.location.district ? `${project.location.district}, ` : ""}{project.location.city}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge status={project.status} />
          <Link
            href={`/projects/${id}`}
            target="_blank"
            className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 hover:border-emerald-400 hover:text-emerald-700 px-3 py-2 rounded-xl transition-colors"
          >
            <Eye className="w-4 h-4" /> Önizle
          </Link>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-amber-50 text-sm font-semibold px-4 py-2 rounded-xl ring-1 ring-amber-400/25 transition-colors"
          >
            {saved
              ? <><Check className="w-4 h-4" /> Kaydedildi</>
              : saving
                ? <><Save className="w-4 h-4 animate-pulse" /> Kaydediliyor…</>
                : <><Save className="w-4 h-4" /> Kaydet</>
            }
          </button>
        </div>
      </div>

      {/* Tab çubuğu */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {TABS.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === t.id
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── SEKME: Genel Bilgiler ──────────────────────────────────────────── */}
      {tab === "genel" && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">

          <Sec label="Temel Bilgiler">
            <FieldRow label="Proje Adı">
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Proje adı"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-500 focus:shadow-[0_0_0_2px_rgba(63,96,72,0.18)] transition-shadow" />
            </FieldRow>
            <FieldRow label="Mülk Tipi">
              <CatChips options={PROP_CATS} value={type} onChange={setType} />
            </FieldRow>
            <FieldRow label="Yayın Durumu">
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTS.map(o => (
                  <button key={o.value} type="button" onClick={() => setStatus(o.value)}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                      status === o.value
                        ? "bg-emerald-800 text-amber-50 border-emerald-800 ring-1 ring-amber-400/30"
                        : "bg-white text-gray-600 border-gray-200 hover:border-amber-300"
                    }`}>
                    {o.label}
                  </button>
                ))}
              </div>
            </FieldRow>
          </Sec>

          <Sec label="Konum">
            <FieldRow label="İl ve İlçe">
              <LocationPicker
                value={{ city, districts }}
                onChange={({ city: c, districts: d }) => { setCity(c); setDistricts(d) }}
              />
            </FieldRow>
          </Sec>

          <Sec label="Birimler & Alan">
            <FieldRow label="Oda Tipleri">
              <div className="flex flex-wrap gap-2">
                {ROOM_TYPES.map(r => (
                  <Chip key={r} label={r} selected={roomTypes.includes(r)}
                    onClick={() => setRoomTypes(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r])} />
                ))}
              </div>
            </FieldRow>
            <FieldRow label="Kullanım Alanı (m²)">
              <div className="flex items-center gap-2">
                <NumInput value={sqmMin} onChange={setSqmMin} placeholder="min" suffix="m²" />
                <span className="shrink-0 text-gray-300">–</span>
                <NumInput value={sqmMax} onChange={setSqmMax} placeholder="max" suffix="m²" />
              </div>
            </FieldRow>
            <div className="grid grid-cols-2 gap-4">
              <FieldRow label="Toplam Konut">
                <NumInput value={totalUnits} onChange={setTotalUnits} placeholder="120" suffix="adet" />
              </FieldRow>
              <FieldRow label="Satılan Konut">
                <NumInput value={soldUnits} onChange={setSoldUnits} placeholder="45" suffix="adet" />
              </FieldRow>
            </div>
          </Sec>

          <Sec label="Fiyat">
            <FieldRow label="Başlangıç Fiyatı">
              <div className="flex gap-2">
                <NumInput value={priceStart} onChange={setPriceStart} placeholder="4.500.000" suffix={currency} />
                <div className="flex rounded-xl border border-gray-300 overflow-hidden shrink-0">
                  {CURRENCIES.map(c => (
                    <button key={c} type="button" onClick={() => setCurrency(c)}
                      className={`px-3 py-2.5 text-sm font-medium transition-colors ${
                        currency === c ? "bg-emerald-800 text-amber-50" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </FieldRow>
          </Sec>

          <Sec label="İnşaat Durumu">
            <FieldRow label="Aktif Aşama">
              <CatChips options={PHASE_CATS} value={phase} onChange={setPhase} />
            </FieldRow>
            <div className="grid grid-cols-2 gap-4">
              <FieldRow label="Genel Tamamlanma">
                <NumInput value={completion} onChange={setCompletion} placeholder="65" suffix="%" />
              </FieldRow>
              <FieldRow label="Tahmini Teslim">
                <input value={delivery} onChange={e => setDelivery(e.target.value)} placeholder="Q3 2026"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-500 focus:shadow-[0_0_0_2px_rgba(63,96,72,0.18)] transition-shadow" />
              </FieldRow>
            </div>
            <FieldRow label="İskan Durumu">
              <label className="flex items-center gap-3 cursor-pointer w-fit select-none">
                <button type="button" role="switch" aria-checked={occupancy} onClick={() => setOccupancy(p => !p)}
                  className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${occupancy ? "bg-emerald-700" : "bg-gray-200"}`}>
                  <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${occupancy ? "translate-x-4" : "translate-x-0"}`} />
                </button>
                <span className="text-sm text-gray-700">İskan hazır</span>
              </label>
            </FieldRow>
          </Sec>
        </div>
      )}

      {/* ── SEKME: İnşaat Aşamaları ───────────────────────────────────────── */}
      {tab === "insaat" && (
        <div className="space-y-3">
          {PHASE_ORDER.map((key, pi) => {
            const pd = phaseDetails.find(p => p.key === key)
            if (!pd) return null
            const isOpen = openPhase === pi
            const done = pd.percent === 100
            const active = pd.percent > 0 && pd.percent < 100

            return (
              <div key={key} className={`bg-white rounded-2xl border transition-colors ${isOpen ? "border-emerald-300" : "border-gray-200"}`}>
                {/* Başlık */}
                <button type="button" onClick={() => setOpenPhase(isOpen ? -1 : pi)}
                  className="w-full flex items-center gap-3 p-4 text-left">
                  <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    done ? "bg-emerald-600 border-emerald-600" : active ? "bg-white border-emerald-500" : "bg-white border-gray-200"}`}>
                    {done
                      ? <Check className="w-4 h-4 text-white" />
                      : active
                        ? <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        : <span className="w-2 h-2 rounded-full bg-gray-200" />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{PHASE_LABELS[key]}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden max-w-32">
                        <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${pd.percent}%` }} />
                      </div>
                      <span className={`text-xs font-semibold ${done ? "text-emerald-600" : active ? "text-emerald-600" : "text-gray-400"}`}>%{pd.percent}</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Detay */}
                {isOpen && (
                  <div className="px-4 pb-5 border-t border-gray-100 pt-4">
                    {/* % güncelle */}
                    <div className="flex items-center gap-3 mb-5">
                      <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">Tamamlanma Oranı</label>
                      <NumInput value={String(pd.percent)} onChange={v => updatePhasePercent(pi, v)} placeholder="0" suffix="%" className="max-w-[120px]" />
                    </div>

                    {/* Adımlar */}
                    <div className="space-y-3">
                      {pd.steps.map((step, si) => (
                        <div key={step.label + si} className="rounded-xl border border-gray-100 bg-gray-50/60 p-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">{step.label}</p>

                          {/* Mevcut fotoğraflar */}
                          {step.images.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              {step.images.map((url, ii) => (
                                <div key={url + ii} className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-600 max-w-[200px]">
                                  <span className="truncate">{url.split("/").pop()}</span>
                                  <button type="button" onClick={() => removePhotoUrl(pi, si, ii)}
                                    className="shrink-0 text-gray-400 hover:text-red-500 transition-colors">
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* URL ekle */}
                          <PhotoUrlInput onAdd={url => addPhotoUrl(pi, si, url)} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* ── SEKME: Bağımsız Bölümler ──────────────────────────────────────── */}
      {tab === "birimler" && (
        <div className="space-y-3">
          {unitTypes.length === 0 && !addingUnit && (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
              <p className="text-sm text-gray-400">Henüz bağımsız bölüm eklenmedi.</p>
            </div>
          )}

          {unitTypes.map((u, ui) => {
            const isOpen = openUnit === ui
            return (
              <div key={u.oda + ui} className={`bg-white rounded-2xl border transition-colors ${isOpen ? "border-emerald-300" : "border-gray-200"}`}>
                <div className="flex items-center gap-3 p-4">
                  <button type="button" onClick={() => setOpenUnit(isOpen ? null : ui)} className="flex-1 flex items-center gap-3 text-left">
                    <span className={`shrink-0 inline-flex items-center justify-center w-14 h-10 rounded-lg font-bold text-sm ${isOpen ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700"}`}>
                      {u.oda.split(" ")[0] || "—"}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{u.oda || "—"}</p>
                      <p className="text-xs text-gray-500">{u.m2.min}–{u.m2.max} m² · {u.count} adet</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 ml-auto mr-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <button type="button" onClick={() => deleteUnit(ui)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {isOpen && (
                  <div className="px-4 pb-5 pt-2 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FieldRow label="Oda Tipi (örn: 3+1)">
                      <input value={u.oda} onChange={e => updateUnit(ui, { oda: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-500" />
                    </FieldRow>
                    <FieldRow label="Başlangıç Fiyatı">
                      <NumInput value={String(u.priceFrom || "")} onChange={v => updateUnit(ui, { priceFrom: Number(v) || 0 })} placeholder="0" suffix="₺" />
                    </FieldRow>
                    <FieldRow label="Alan (m²)">
                      <div className="flex items-center gap-2">
                        <NumInput value={String(u.m2.min || "")} onChange={v => updateUnit(ui, { m2: { ...u.m2, min: Number(v) || 0 } })} placeholder="min" suffix="m²" />
                        <span className="shrink-0 text-gray-300">–</span>
                        <NumInput value={String(u.m2.max || "")} onChange={v => updateUnit(ui, { m2: { ...u.m2, max: Number(v) || 0 } })} placeholder="max" suffix="m²" />
                      </div>
                    </FieldRow>
                    <FieldRow label="Adet / Müsait / Satılan">
                      <div className="flex items-center gap-2">
                        <NumInput value={String(u.count || "")} onChange={v => updateUnit(ui, { count: Number(v) || 0 })} placeholder="toplam" suffix="adet" />
                        <NumInput value={String(u.available || "")} onChange={v => updateUnit(ui, { available: Number(v) || 0 })} placeholder="müsait" suffix="" />
                        <NumInput value={String(u.sold || "")} onChange={v => updateUnit(ui, { sold: Number(v) || 0 })} placeholder="satılan" suffix="" />
                      </div>
                    </FieldRow>
                    <FieldRow label="Özellikler (virgülle ayırın)">
                      <input
                        value={(u.features ?? []).join(", ")}
                        onChange={e => updateUnit(ui, { features: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                        placeholder="Ebeveyn banyosu, Bahçe, Teras…"
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-500"
                      />
                    </FieldRow>
                    <FieldRow label="Mimari Plan Görseli (URL)">
                      <input value={u.floorPlan ?? ""} onChange={e => updateUnit(ui, { floorPlan: e.target.value })}
                        placeholder="/plans/3plus1-a-tipi.jpg"
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-500" />
                    </FieldRow>
                  </div>
                )}
              </div>
            )
          })}

          {/* Yeni birim ekleme formu */}
          {addingUnit && (
            <div className="bg-white rounded-2xl border border-emerald-300 p-5 space-y-4">
              <p className="eyebrow text-emerald-700/90">Yeni Bağımsız Bölüm Tipi</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldRow label="Oda Tipi (örn: 3+1)">
                  <input value={newUnit.oda} onChange={e => setNewUnit(u => ({ ...u, oda: e.target.value }))}
                    placeholder="3+1" className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-500" />
                </FieldRow>
                <FieldRow label="Başlangıç Fiyatı">
                  <NumInput value={String(newUnit.priceFrom || "")} onChange={v => setNewUnit(u => ({ ...u, priceFrom: Number(v) || 0 }))} placeholder="0" suffix="₺" />
                </FieldRow>
                <FieldRow label="Alan (m²)">
                  <div className="flex items-center gap-2">
                    <NumInput value={String(newUnit.m2.min || "")} onChange={v => setNewUnit(u => ({ ...u, m2: { ...u.m2, min: Number(v) || 0 } }))} placeholder="min" suffix="m²" />
                    <span className="shrink-0 text-gray-300">–</span>
                    <NumInput value={String(newUnit.m2.max || "")} onChange={v => setNewUnit(u => ({ ...u, m2: { ...u.m2, max: Number(v) || 0 } }))} placeholder="max" suffix="m²" />
                  </div>
                </FieldRow>
                <FieldRow label="Adet / Müsait / Satılan">
                  <div className="flex items-center gap-2">
                    <NumInput value={String(newUnit.count || "")} onChange={v => setNewUnit(u => ({ ...u, count: Number(v) || 0 }))} placeholder="toplam" suffix="" />
                    <NumInput value={String(newUnit.available || "")} onChange={v => setNewUnit(u => ({ ...u, available: Number(v) || 0 }))} placeholder="müsait" suffix="" />
                    <NumInput value={String(newUnit.sold || "")} onChange={v => setNewUnit(u => ({ ...u, sold: Number(v) || 0 }))} placeholder="satılan" suffix="" />
                  </div>
                </FieldRow>
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setAddingUnit(false)}
                  className="flex-1 border border-gray-300 text-gray-600 text-sm font-medium py-2 rounded-xl hover:bg-gray-50 transition-colors">
                  İptal
                </button>
                <button type="button" onClick={addUnit} disabled={!newUnit.oda}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-300 text-amber-50 text-sm font-semibold py-2 rounded-xl transition-colors">
                  Ekle
                </button>
              </div>
            </div>
          )}

          <button type="button" onClick={() => setAddingUnit(true)} disabled={addingUnit}
            className="flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800 border border-dashed border-emerald-300 hover:border-emerald-500 px-4 py-3 rounded-2xl w-full justify-center transition-colors disabled:opacity-40">
            <Plus className="w-4 h-4" /> Yeni Bağımsız Bölüm Tipi Ekle
          </button>
        </div>
      )}

      {/* ── SEKME: Teknik Şartname ────────────────────────────────────────── */}
      {tab === "sartname" && (
        <div className="space-y-4">
          {techSpecs.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
              <p className="text-sm text-gray-400 mb-3">Henüz teknik şartname eklenmedi.</p>
              <button type="button" onClick={() => setTechSpecs(STANDARD_TECH_SPECS)}
                className="text-sm font-medium text-emerald-700 hover:underline">
                Standart şartnameyi yükle
              </button>
            </div>
          )}

          {techSpecs.map((group, gi) => (
            <div key={group.category + gi} className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <input value={group.category} onChange={e => updateSpecCat(gi, e.target.value)}
                  className="flex-1 font-semibold text-gray-800 text-sm px-3 py-1.5 rounded-lg border border-gray-200 outline-none focus:border-emerald-500 bg-gray-50 focus:bg-white transition-colors" />
                <button type="button" onClick={() => deleteSpecGroup(gi)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {group.items.map((item, ii) => (
                  <div key={ii} className="flex items-center gap-2">
                    <input value={item.label} onChange={e => updateSpecItem(gi, ii, "label", e.target.value)}
                      placeholder="Özellik"
                      className="w-1/3 shrink-0 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-emerald-500" />
                    <input value={item.value} onChange={e => updateSpecItem(gi, ii, "value", e.target.value)}
                      placeholder="Değer / açıklama"
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-emerald-500" />
                    <button type="button" onClick={() => deleteSpecItem(gi, ii)} className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button type="button" onClick={() => addSpecItem(gi)}
                className="flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-medium mt-1">
                <Plus className="w-3.5 h-3.5" /> Satır ekle
              </button>
            </div>
          ))}

          <div className="flex gap-2">
            <button type="button" onClick={addSpecGroup}
              className="flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800 border border-dashed border-emerald-300 hover:border-emerald-500 px-4 py-3 rounded-2xl flex-1 justify-center transition-colors">
              <Plus className="w-4 h-4" /> Yeni Grup Ekle
            </button>
            {techSpecs.length > 0 && (
              <button type="button" onClick={() => setTechSpecs(STANDARD_TECH_SPECS)}
                className="text-sm text-gray-500 border border-gray-200 hover:border-gray-300 px-4 py-3 rounded-2xl transition-colors whitespace-nowrap">
                Varsayılanı Yükle
              </button>
            )}
          </div>
        </div>
      )}

      {/* Alt kaydet — uzun formlarda ikinci kaydet düğmesi */}
      <div className="mt-6 flex justify-end">
        <button type="button" onClick={handleSave} disabled={saving}
          className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-amber-50 text-sm font-semibold px-5 py-2.5 rounded-full ring-1 ring-amber-400/25 transition-colors">
          {saved ? <><Check className="w-4 h-4" /> Kaydedildi</> : saving ? "Kaydediliyor…" : <><Save className="w-4 h-4" /> Değişiklikleri Kaydet</>}
        </button>
      </div>

    </main>
  )
}

// ── Fotoğraf URL girişi ────────────────────────────────────────────────────────

function PhotoUrlInput({ onAdd }: { onAdd: (url: string) => void }) {
  const [val, setVal] = useState("")
  return (
    <div className="flex gap-2 mt-1">
      <div className="relative flex-1">
        <ImagePlus className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        <input
          type="text"
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); onAdd(val); setVal("") } }}
          placeholder="Fotoğraf URL'si ekle (Enter)"
          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 outline-none focus:border-emerald-400 bg-white"
        />
      </div>
      <button type="button"
        onClick={() => { onAdd(val); setVal("") }}
        disabled={!val.trim()}
        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-gray-100 disabled:text-gray-300 text-white text-xs font-medium rounded-lg transition-colors">
        Ekle
      </button>
    </div>
  )
}
