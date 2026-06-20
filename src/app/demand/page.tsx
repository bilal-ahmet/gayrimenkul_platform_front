"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search, CheckCircle2, AlertCircle,
  Building2, Home, Building, Layers, KeyRound, Store, Briefcase,
  Hammer, Trees, Waves, Car, ChefHat, UtensilsCrossed, Wind, Sun,
  Zap, Thermometer, Wifi, Shield,
  Bath, Flame, Dumbbell, Tv2, Shirt, Package, DoorOpen, Laptop,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chip from "@/components/ui/Chip";
import LocationPicker from "@/components/ui/LocationPicker";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
import type { LucideIcon } from "lucide-react";

// ── Ortak yardımcılar ────────────────────────────────────────────────────────

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">{label}</label>
      {children}
    </div>
  )
}

interface CategoryChip {
  value: string
  label: string
  icon: LucideIcon
}

function CategoryChipGroup({
  options,
  selected,
  onToggle,
  single,
}: {
  options: CategoryChip[]
  selected: string[]
  onToggle: (v: string) => void
  single?: boolean
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map(({ value, label, icon: Icon }) => {
        const active = single ? selected[0] === value : selected.includes(value)
        return (
          <button
            key={value}
            type="button"
            onClick={() => onToggle(value)}
            className={`group relative flex items-center gap-2 shrink-0 pl-1.5 pr-3.5 py-1.5 rounded-xl text-sm font-medium tracking-wide border transition-all duration-200 ${
              active
                ? "bg-emerald-800 text-amber-50 border-emerald-800 shadow-[0_6px_18px_-6px_rgba(12,20,15,0.5)] ring-1 ring-amber-400/30"
                : "bg-white text-gray-600 border-gray-200 hover:text-emerald-800 hover:border-amber-300"
            }`}
          >
            <span className={`grid place-items-center w-7 h-7 rounded-lg transition-colors duration-200 ${
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

function BudgetRow({
  min, max,
  onMin, onMax,
}: {
  min: string; max: string
  onMin: (v: string) => void
  onMax: (v: string) => void
}) {
  return (
    <div className="flex items-center gap-2">
      {(["min", "max"] as const).map((side) => {
        const val = side === "min" ? min : max
        const setter = side === "min" ? onMin : onMax
        return (
          <div key={side} className="relative flex-1 min-w-0">
            <input
              type="text"
              inputMode="numeric"
              placeholder={side === "min" ? "Min" : "Max"}
              value={val === "" ? "" : Number(val).toLocaleString("tr-TR")}
              onChange={e => {
                const digits = e.target.value.replace(/[^\d]/g, "")
                setter(digits)
              }}
              className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-gray-300 text-sm tabular-nums outline-none focus:border-emerald-500 focus:shadow-[0_0_0_2px_rgba(63,96,72,0.18)] transition-shadow"
            />
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">₺</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Sabitler ─────────────────────────────────────────────────────────────────

const PROPERTY_CATS: CategoryChip[] = [
  { value: "daire",    label: "Daire",        icon: Building2  },
  { value: "villa",    label: "Villa",         icon: Home       },
  { value: "rezidans", label: "Rezidans",      icon: Building   },
  { value: "karma",    label: "Karma",         icon: Layers     },
  { value: "dukkan",   label: "Dükkan",        icon: Store      },
  { value: "ofis",     label: "Ofis",          icon: Briefcase  },
  { value: "completed",label: "Teslim Hazır",  icon: KeyRound   },
]

const ROOM_TYPES    = ["1+1", "2+1", "3+1", "4+1", "5+1", "6+1"]
const TIMELINES     = [
  { value: "0-3",   label: "0–3 ay"   },
  { value: "3-6",   label: "3–6 ay"   },
  { value: "6-12",  label: "6–12 ay"  },
  { value: "12-24", label: "12–24 ay" },
]

// ── Özel yapım sabitleri ──────────────────────────────────────────────────────

const BUILD_TYPES: CategoryChip[] = [
  { value: "mustakil", label: "Müstakil",  icon: Home      },
  { value: "dubleks",  label: "Dubleks",   icon: Layers    },
  { value: "villa",    label: "Villa",     icon: Home      },
  { value: "bungalov", label: "Bungalov",  icon: Trees     },
]

const FEATURES: { value: string; label: string; icon: LucideIcon; group: string }[] = [
  // Odalar & alanlar
  { value: "ebeveyn_banyo",  label: "Ebeveyn Banyosu",     icon: Bath,           group: "Odalar & Alanlar" },
  { value: "giyinme_odasi",  label: "Giyinme Odası",       icon: Shirt,          group: "Odalar & Alanlar" },
  { value: "camasir_odasi",  label: "Çamaşır Odası",       icon: Shirt,          group: "Odalar & Alanlar" },
  { value: "kiler",          label: "Kiler",                icon: Package,        group: "Odalar & Alanlar" },
  { value: "vestiyer",       label: "Vestiyer Alanı",       icon: DoorOpen,       group: "Odalar & Alanlar" },
  { value: "calisma_odasi",  label: "Çalışma Odası",        icon: Laptop,         group: "Odalar & Alanlar" },
  { value: "spor_salonu",    label: "Spor Salonu",          icon: Dumbbell,       group: "Odalar & Alanlar" },
  { value: "sinema_odasi",   label: "Sinema Odası",         icon: Tv2,            group: "Odalar & Alanlar" },
  // Dış mekan
  { value: "havuz",          label: "Yüzme Havuzu",        icon: Waves,          group: "Dış Mekan" },
  { value: "bahce",          label: "Bahçe",                icon: Trees,          group: "Dış Mekan" },
  { value: "garaj",          label: "Kapalı Garaj",         icon: Car,            group: "Dış Mekan" },
  { value: "balkon",         label: "Balkon / Teras",       icon: Wind,           group: "Dış Mekan" },
  // Mutfak & ıslanma
  { value: "kapali_mutfak",  label: "Kapalı Mutfak",       icon: ChefHat,        group: "Mutfak & Banyo" },
  { value: "acik_mutfak",    label: "Açık Mutfak",         icon: UtensilsCrossed, group: "Mutfak & Banyo" },
  { value: "jakuzi",         label: "Jakuzi / Küvet",       icon: Bath,           group: "Mutfak & Banyo" },
  { value: "sauna",          label: "Sauna",                icon: Flame,          group: "Mutfak & Banyo" },
  // Sistem & teknoloji
  { value: "gunes",          label: "Güneş Paneli",         icon: Sun,            group: "Sistem & Teknoloji" },
  { value: "jeotermal",      label: "Jeotermal Isıtma",     icon: Thermometer,    group: "Sistem & Teknoloji" },
  { value: "akilli_ev",      label: "Akıllı Ev Sistemi",    icon: Wifi,           group: "Sistem & Teknoloji" },
  { value: "kamera",         label: "Güvenlik Sistemi",     icon: Shield,         group: "Sistem & Teknoloji" },
  { value: "elektrik",       label: "EV Şarj İstasyonu",    icon: Zap,            group: "Sistem & Teknoloji" },
]

const STYLE_OPTS = ["Modern", "Klasik", "Bohem", "İskandinav", "Endüstriyel", "Rustik"]
const FACADE_OPTS = ["Saten Sıva", "Taş Kaplama", "Ahşap Kaplama", "Metal Kompozit", "Tuğla"]
const FLOOR_OPTS  = ["1", "2", "3", "4+"]

// ── Ana bileşen ───────────────────────────────────────────────────────────────

export default function DemandPage() {
  const router = useRouter()
  const [tab, setTab] = useState<"hazir" | "ozel">("hazir")

  useEffect(() => {
    if (!localStorage.getItem("demo_user")) router.push("/login?next=/demand")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Hazır konut talebi state ────────────────────────────────────────────────
  const [city,              setCity]              = useState("")
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([])
  const [propertyTypes,     setPropertyTypes]     = useState<string[]>([])
  const [roomTypes,         setRoomTypes]         = useState<string[]>([])
  const [budgetMin,         setBudgetMin]         = useState("")
  const [budgetMax,         setBudgetMax]         = useState("")
  const [timeline,          setTimeline]          = useState("")
  const [notifEmail,        setNotifEmail]        = useState(true)
  const [notifSms,          setNotifSms]          = useState(false)
  const [submitted,         setSubmitted]         = useState(false)

  // ── Özel yapım talebi state ────────────────────────────────────────────────
  const [buildCity,         setBuildCity]         = useState("")
  const [buildDistricts,    setBuildDistricts]    = useState<string[]>([])
  const [hasLand,           setHasLand]           = useState<boolean | null>(null)
  const [buildTypes,        setBuildTypes]        = useState<string[]>([])
  const [buildRooms,        setBuildRooms]        = useState<string[]>([])
  const [buildFloors,       setBuildFloors]       = useState<string[]>([])
  const [buildAreaMin,      setBuildAreaMin]      = useState("")
  const [buildAreaMax,      setBuildAreaMax]      = useState("")
  const [buildBudgetMin,    setBuildBudgetMin]    = useState("")
  const [buildBudgetMax,    setBuildBudgetMax]    = useState("")
  const [selectedFeatures,  setSelectedFeatures]  = useState<string[]>([])
  const [buildStyle,        setBuildStyle]        = useState("")
  const [buildFacade,       setBuildFacade]       = useState("")
  const [buildTimeline,     setBuildTimeline]     = useState("")
  const [buildNotes,        setBuildNotes]        = useState("")
  const [buildNotifEmail,   setBuildNotifEmail]   = useState(true)
  const [buildNotifSms,     setBuildNotifSms]     = useState(false)
  const [buildSubmitted,    setBuildSubmitted]    = useState(false)

  // ── Canlı eşleştirme ────────────────────────────────────────────────────────
  const hasAnyCriteria = !!(city || propertyTypes.length || roomTypes.length || budgetMax)

  const matchedProjects = useMemo(() => {
    if (!hasAnyCriteria) return []
    return projects.filter(p => {
      if (p.status !== 'live') return false
      if (city && p.location.city !== city) return false
      if (selectedDistricts.length > 0 && !selectedDistricts.includes(p.location.district)) return false
      if (propertyTypes.length > 0 && !propertyTypes.some(t =>
        t === 'completed' ? p.status === 'completed' : p.type === t
      )) return false
      if (roomTypes.length > 0 && !roomTypes.some(r => p.roomTypes.includes(r))) return false
      if (budgetMax && p.priceStart > parseInt(budgetMax)) return false
      if (budgetMin && p.priceStart < parseInt(budgetMin)) return false
      return true
    })
  }, [city, selectedDistricts, propertyTypes, roomTypes, budgetMin, budgetMax, hasAnyCriteria])

  // ── Başarı ekranları ────────────────────────────────────────────────────────
  if (submitted || buildSubmitted) {
    const isOzel = buildSubmitted
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-gray-50 py-16 px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isOzel ? "Özel yapım talebiniz alındı!" : "Talebiniz kaydedildi!"}
            </h2>
            <p className="text-gray-500 text-sm">
              {isOzel
                ? "Kriterlerinizle eşleşen müteahhit firmalar sizinle iletişime geçecek."
                : "Kriterlerinize uyan projeler yayına girdiğinde tercih ettiğiniz kanaldan bildirim alacaksınız."}
            </p>
            <button
              onClick={() => { setSubmitted(false); setBuildSubmitted(false) }}
              className="mt-6 text-sm text-emerald-600 hover:underline"
            >
              Yeni talep oluştur
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Başlık + sekme seçici */}
          <div className="mb-8">
            <h1 className="font-display text-3xl text-gray-900">Talep Oluştur</h1>
            <p className="text-gray-500 text-sm mt-1">
              Kriterlerinizi girin — sistemde eşleşen proje varsa anında gösterilir; yoksa talebiniz kurumsal firmalara iletilir.
            </p>

            {/* Sekme geçişi */}
            <div className="mt-5 inline-flex rounded-2xl border border-gray-200 bg-white p-1 gap-1 shadow-sm">
              <button
                type="button"
                onClick={() => setTab("hazir")}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  tab === "hazir"
                    ? "bg-emerald-800 text-amber-50 shadow-[0_4px_12px_-4px_rgba(12,20,15,0.45)] ring-1 ring-amber-400/30"
                    : "text-gray-600 hover:text-emerald-800"
                }`}
              >
                <Building2 className="w-4 h-4" />
                Hazır Konut / Proje
              </button>
              <button
                type="button"
                onClick={() => setTab("ozel")}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  tab === "ozel"
                    ? "bg-emerald-800 text-amber-50 shadow-[0_4px_12px_-4px_rgba(12,20,15,0.45)] ring-1 ring-amber-400/30"
                    : "text-gray-600 hover:text-emerald-800"
                }`}
              >
                <Hammer className="w-4 h-4" />
                Özel Ev Yaptır
              </button>
            </div>
          </div>

          {/* ── SEKME 1: Hazır konut talebi ─────────────────────────────────── */}
          {tab === "hazir" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">

                  <Section label="Konum">
                    <LocationPicker
                      value={{ city, districts: selectedDistricts }}
                      onChange={({ city: c, districts }) => { setCity(c); setSelectedDistricts(districts) }}
                    />
                  </Section>

                  <Section label="Mülk Tipi">
                    <CategoryChipGroup
                      options={PROPERTY_CATS}
                      selected={propertyTypes}
                      onToggle={v => setPropertyTypes(prev => toggle(prev, v))}
                    />
                  </Section>

                  <Section label="Oda Sayısı">
                    <div className="flex flex-wrap gap-2">
                      {ROOM_TYPES.map(r => (
                        <Chip
                          key={r}
                          label={r}
                          selected={roomTypes.includes(r)}
                          onClick={() => setRoomTypes(prev => toggle(prev, r))}
                        />
                      ))}
                    </div>
                  </Section>

                  <Section label="Bütçe Aralığı (₺)">
                    <BudgetRow min={budgetMin} max={budgetMax} onMin={setBudgetMin} onMax={setBudgetMax} />
                  </Section>

                  <Section label="Ne zaman almayı planlıyorsunuz?">
                    <div className="flex flex-wrap gap-2">
                      {TIMELINES.map(t => (
                        <Chip
                          key={t.value}
                          label={t.label}
                          selected={timeline === t.value}
                          onClick={() => setTimeline(t.value)}
                        />
                      ))}
                    </div>
                  </Section>

                  <Section label="Bildirim Tercihi">
                    <div className="flex flex-wrap gap-4">
                      {([["E-posta", notifEmail, setNotifEmail], ["SMS", notifSms, setNotifSms]] as const).map(
                        ([label, val, setVal]) => (
                          <label key={label} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={val}
                              onChange={e => setVal(e.target.checked)}
                              className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm text-gray-600">{label}</span>
                          </label>
                        )
                      )}
                    </div>
                  </Section>

                  <button
                    onClick={() => setSubmitted(true)}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-amber-50 font-semibold tracking-wide py-3 rounded-full ring-1 ring-amber-400/25 transition-colors text-sm"
                  >
                    {matchedProjects.length === 0 && hasAnyCriteria
                      ? "Talep Oluştur — Bildirim Al"
                      : "Talebi Kaydet"}
                  </button>
                </div>
              </div>

              {/* Canlı eşleşme */}
              <div className="space-y-4">
                {!hasAnyCriteria ? (
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                    <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-500">Kriterlerinizi girin</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Sistemdeki eşleşen projeler burada anlık görünür.
                    </p>
                  </div>
                ) : matchedProjects.length > 0 ? (
                  <>
                    <div className="flex items-center gap-2 px-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <p className="text-sm font-semibold text-emerald-700">
                        {matchedProjects.length} eşleşen proje bulundu
                      </p>
                    </div>
                    {matchedProjects.map(p => (
                      <ProjectCard key={p.id} project={p} />
                    ))}
                  </>
                ) : (
                  <div className="bg-white rounded-2xl border border-amber-200 p-6 text-center">
                    <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-gray-700">Eşleşen proje bulunamadı</p>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      Şu an kriterlere uyan aktif proje yok. Talebi kaydedin — yeni proje eklendiğinde bildirim alırsınız.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── SEKME 2: Özel ev yaptırma talebi ───────────────────────────── */}
          {tab === "ozel" && (
            <div className="max-w-3xl space-y-6">

              {/* Bilgi bandı */}
              <div className="rounded-2xl bg-emerald-950 text-amber-50 px-6 py-5 flex gap-4">
                <Hammer className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-base mb-1">Hayalinizdeki evi sıfırdan yaptırın</p>
                  <p className="text-emerald-100/70 text-sm leading-relaxed">
                    İstediğiniz tüm özellikleri seçin. Talebiniz kriterlere uyan müteahhit firmalarla eşleştirilir ve size ulaşmaları sağlanır.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">

                {/* Konum */}
                <Section label="Konum">
                  <LocationPicker
                    value={{ city: buildCity, districts: buildDistricts }}
                    onChange={({ city: c, districts }) => { setBuildCity(c); setBuildDistricts(districts) }}
                  />
                </Section>

                {/* Arsa */}
                <Section label="Arsanız var mı?">
                  <div className="flex gap-2">
                    {[
                      { val: true,  label: "Evet, arsam var" },
                      { val: false, label: "Hayır, arsa da lazım" },
                    ].map(({ val, label }) => (
                      <button
                        key={String(val)}
                        type="button"
                        onClick={() => setHasLand(val)}
                        className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                          hasLand === val
                            ? "bg-emerald-800 text-amber-50 border-emerald-800 ring-1 ring-amber-400/30"
                            : "bg-white text-gray-600 border-gray-200 hover:border-amber-300"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </Section>

                {/* Ev tipi */}
                <Section label="Ev Tipi">
                  <CategoryChipGroup
                    options={BUILD_TYPES}
                    selected={buildTypes}
                    onToggle={v => setBuildTypes(prev => toggle(prev, v))}
                  />
                </Section>

                {/* Kat sayısı */}
                <Section label="Kat Sayısı">
                  <div className="flex flex-wrap gap-2">
                    {FLOOR_OPTS.map(f => (
                      <Chip
                        key={f}
                        label={f + " kat"}
                        selected={buildFloors.includes(f)}
                        onClick={() => setBuildFloors(prev => toggle(prev, f))}
                      />
                    ))}
                  </div>
                </Section>

                {/* Oda sayısı */}
                <Section label="Oda Sayısı">
                  <div className="flex flex-wrap gap-2">
                    {ROOM_TYPES.map(r => (
                      <Chip
                        key={r}
                        label={r}
                        selected={buildRooms.includes(r)}
                        onClick={() => setBuildRooms(prev => toggle(prev, r))}
                      />
                    ))}
                  </div>
                </Section>

                {/* Alan */}
                <Section label="Kullanım Alanı (m²)">
                  <div className="flex items-center gap-2">
                    {(["min", "max"] as const).map(side => {
                      const val  = side === "min" ? buildAreaMin : buildAreaMax
                      const setter = side === "min" ? setBuildAreaMin : setBuildAreaMax
                      return (
                        <div key={side} className="relative flex-1 min-w-0">
                          <input
                            type="text"
                            inputMode="numeric"
                            placeholder={side === "min" ? "Min" : "Max"}
                            value={val === "" ? "" : Number(val).toLocaleString("tr-TR")}
                            onChange={e => setter(e.target.value.replace(/[^\d]/g, ""))}
                            className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-gray-300 text-sm tabular-nums outline-none focus:border-emerald-500 focus:shadow-[0_0_0_2px_rgba(63,96,72,0.18)] transition-shadow"
                          />
                          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">m²</span>
                        </div>
                      )
                    })}
                  </div>
                </Section>

                {/* Özellikler */}
                <Section label="İstediğiniz Özellikler">
                  <div className="space-y-3">
                    {Array.from(new Set(FEATURES.map(f => f.group))).map(group => (
                      <div key={group}>
                        <p className="eyebrow text-emerald-700/80 mb-2">{group}</p>
                        <div className="flex flex-wrap gap-2">
                          {FEATURES.filter(f => f.group === group).map(({ value, label, icon: Icon }) => {
                            const active = selectedFeatures.includes(value)
                            return (
                              <button
                                key={value}
                                type="button"
                                onClick={() => setSelectedFeatures(prev => toggle(prev, value))}
                                className={`flex items-center gap-1.5 pl-1.5 pr-3 py-1.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                                  active
                                    ? "bg-emerald-800 text-amber-50 border-emerald-800 ring-1 ring-amber-400/30"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-amber-300 hover:text-emerald-800"
                                }`}
                              >
                                <span className={`grid place-items-center w-6 h-6 rounded-lg transition-colors ${
                                  active ? "bg-amber-400 text-emerald-950" : "bg-gray-100 text-gray-400"
                                }`}>
                                  <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                                </span>
                                {label}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* İç tasarım stili */}
                <Section label="İç Tasarım Stili">
                  <div className="flex flex-wrap gap-2">
                    {STYLE_OPTS.map(s => (
                      <Chip
                        key={s}
                        label={s}
                        selected={buildStyle === s}
                        onClick={() => setBuildStyle(prev => prev === s ? "" : s)}
                      />
                    ))}
                  </div>
                </Section>

                {/* Dış cephe */}
                <Section label="Dış Cephe Malzemesi">
                  <div className="flex flex-wrap gap-2">
                    {FACADE_OPTS.map(f => (
                      <Chip
                        key={f}
                        label={f}
                        selected={buildFacade === f}
                        onClick={() => setBuildFacade(prev => prev === f ? "" : f)}
                      />
                    ))}
                  </div>
                </Section>

                {/* Bütçe */}
                <Section label="Bütçe Aralığı (₺)">
                  <BudgetRow min={buildBudgetMin} max={buildBudgetMax} onMin={setBuildBudgetMin} onMax={setBuildBudgetMax} />
                </Section>

                {/* Zaman çizelgesi */}
                <Section label="Projeye ne zaman başlamayı planlıyorsunuz?">
                  <div className="flex flex-wrap gap-2">
                    {TIMELINES.map(t => (
                      <Chip
                        key={t.value}
                        label={t.label}
                        selected={buildTimeline === t.value}
                        onClick={() => setBuildTimeline(t.value)}
                      />
                    ))}
                  </div>
                </Section>

                {/* Ek notlar */}
                <Section label="Ek Notlar (isteğe bağlı)">
                  <textarea
                    rows={3}
                    placeholder="Özel isteklerinizi, taşınmaz hakkındaki detayları veya önemli gördüğünüz bilgileri buraya yazabilirsiniz…"
                    value={buildNotes}
                    onChange={e => setBuildNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm resize-none outline-none focus:border-emerald-500 focus:shadow-[0_0_0_2px_rgba(63,96,72,0.18)] transition-shadow placeholder:text-gray-400"
                  />
                </Section>

                {/* Bildirim */}
                <Section label="Bildirim Tercihi">
                  <div className="flex flex-wrap gap-4">
                    {([["E-posta", buildNotifEmail, setBuildNotifEmail], ["SMS", buildNotifSms, setBuildNotifSms]] as const).map(
                      ([label, val, setVal]) => (
                        <label key={label} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={val}
                            onChange={e => setVal(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-600">{label}</span>
                        </label>
                      )
                    )}
                  </div>
                </Section>

                <button
                  onClick={() => setBuildSubmitted(true)}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-amber-50 font-semibold tracking-wide py-3 rounded-full ring-1 ring-amber-400/25 transition-colors text-sm"
                >
                  Özel Yapım Talebi Gönder
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  )
}
