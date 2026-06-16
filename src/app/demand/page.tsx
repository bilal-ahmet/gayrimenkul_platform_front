"use client";

import { useState, useEffect, useMemo } from "react";
import { ShieldCheck, Search, CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chip from "@/components/ui/Chip";
import LocationPicker from "@/components/ui/LocationPicker";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

const ROOM_TYPES    = ["1+1", "2+1", "3+1", "4+1", "5+1"]
const PROPERTY_TYPES = ["daire", "villa", "dükkan", "ofis", "rezidans", "karma"]
const TIMELINES     = [
  { value: "0-3",   label: "0–3 ay"   },
  { value: "3-6",   label: "3–6 ay"   },
  { value: "6-12",  label: "6–12 ay"  },
  { value: "12-24", label: "12–24 ay" },
]

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]
}

export default function DemandPage() {
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem("demo_user")) router.push("/login?next=/demand")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  // ── Canlı eşleştirme ─────────────────────────────────────────────────────
  const hasAnyCriteria = !!(city || propertyTypes.length || roomTypes.length || budgetMax)

  const matchedProjects = useMemo(() => {
    if (!hasAnyCriteria) return []
    return projects.filter(p => {
      if (p.status !== 'live') return false
      if (city && p.location.city !== city) return false
      if (selectedDistricts.length > 0 && !selectedDistricts.includes(p.location.district)) return false
      if (propertyTypes.length > 0 && !propertyTypes.includes(p.type)) return false
      if (roomTypes.length > 0 && !roomTypes.some(r => p.roomTypes.includes(r))) return false
      if (budgetMax && p.priceStart > parseInt(budgetMax)) return false
      if (budgetMin && p.priceStart < parseInt(budgetMin)) return false
      return true
    })
  }, [city, selectedDistricts, propertyTypes, roomTypes, budgetMin, budgetMax, hasAnyCriteria])

  // ── Başarı ekranı ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-gray-50 py-16 px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Talebiniz kaydedildi!</h2>
            <p className="text-gray-500 text-sm">
              Kriterlerinize uyan projeler yayına girdiğinde tercih ettiğiniz kanaldan bildirim alacaksınız.
            </p>
            <button
              onClick={() => setSubmitted(false)}
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Taşınmaz Talep / Arama</h1>
            <p className="text-gray-500 text-sm mt-1">
              Kriterlerinizi girin — sistemde eşleşen proje varsa anında gösterilir; yoksa talebiniz kurumsal firmalara iletilir.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── Sol: Form ─────────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">

                {/* Konum (il + ilçe) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Konum</label>
                  <LocationPicker
                    value={{ city, districts: selectedDistricts }}
                    onChange={({ city: c, districts }) => { setCity(c); setSelectedDistricts(districts) }}
                  />
                </div>

                {/* Mülk tipi */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Mülk Tipi</label>
                  <div className="flex flex-wrap gap-2">
                    {PROPERTY_TYPES.map(t => (
                      <Chip
                        key={t}
                        label={t.charAt(0).toUpperCase() + t.slice(1)}
                        selected={propertyTypes.includes(t)}
                        onClick={() => setPropertyTypes(prev => toggle(prev, t))}
                      />
                    ))}
                  </div>
                </div>

                {/* Oda tipi */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Oda Sayısı</label>
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
                </div>

                {/* Bütçe */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Bütçe Aralığı (₺)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={budgetMin}
                      onChange={e => setBudgetMin(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="text-gray-400">–</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={budgetMax}
                      onChange={e => setBudgetMax(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Zaman */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Ne zaman almayı planlıyorsunuz?
                  </label>
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
                </div>

                {/* Bildirimler */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Bildirim Tercihi
                  </label>
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
                </div>

                {/* Gizlilik notu */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-800">
                    <strong>Gizliliğiniz korunur.</strong> Kimliğiniz kurumsal firmalara gösterilmez.
                    Kurumsal firmalar yalnızca anonim toplu istatistik görür.
                  </p>
                </div>

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

            {/* ── Sağ: Canlı eşleşme ───────────────────────────────── */}
            <div className="space-y-4">
              {!hasAnyCriteria ? (
                /* Henüz kriter yok */
                <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                  <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-500">Kriterlerinizi girin</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Sistemdeki eşleşen projeler burada anlık görünür.
                  </p>
                </div>
              ) : matchedProjects.length > 0 ? (
                /* Eşleşen projeler var */
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
                /* Eşleşme yok */
                <div className="bg-white rounded-2xl border border-amber-200 p-6 text-center">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-gray-700">Eşleşen proje bulunamadı</p>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    Şu an kriterlere uyan aktif proje yok. Talebi kaydedin — yeni proje eklendiğinde bildirim alırsınız.
                    Talebiniz aynı zamanda kurumsal firmaların inşaat süreçlerini planlamasına katkı sağlar.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
