"use client";

import { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chip from "@/components/ui/Chip";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

const CITIES = ["İstanbul","Ankara","İzmir","Antalya","Bursa","Kayseri","Kocaeli"]
const DISTRICTS: Record<string, string[]> = {
  "İstanbul": ["Kadıköy","Beşiktaş","Şişli","Ataşehir","Maltepe","Levent"],
  "Ankara": ["Çankaya","Yenimahalle","Keçiören","Mamak"],
  "İzmir": ["Karşıyaka","Bornova","Konak","Buca"],
  "Antalya": ["Muratpaşa","Konyaaltı","Kepez"],
  "Bursa": ["Osmangazi","Nilüfer","Yıldırım"],
  "Kayseri": ["Melikgazi","Kocasinan"],
  "Kocaeli": ["İzmit","Gebze","Kartepe","Gölcük","Darıca","Çayırova","Körfez","Derince","Başiskele","Kandıra","Karamürsel","Dilovası"],
}
const ROOM_TYPES = ["1+1","2+1","3+1","4+1","5+1"]
const PROPERTY_TYPES = ["daire","villa","dükkan","ofis","rezidans"]
const TIMELINES = [{ value: "0-3", label: "0–3 ay" },{ value: "3-6", label: "3–6 ay" },{ value: "6-12", label: "6–12 ay" },{ value: "12-24", label: "12–24 ay" }]

export default function DemandPage() {
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem("demo_user")) router.push("/login?next=/demand")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [city, setCity] = useState("")
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([])
  const [propertyTypes, setPropertyTypes] = useState<string[]>([])
  const [roomTypes, setRoomTypes] = useState<string[]>([])
  const [budgetMin, setBudgetMin] = useState("")
  const [budgetMax, setBudgetMax] = useState("")
  const [timeline, setTimeline] = useState("")
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifSms, setNotifSms] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const toggle = <T extends string>(arr: T[], val: T, set: (a: T[]) => void) => {
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val])
  }

  const similarProjects = projects.filter((p) => p.status === "live").slice(0, 3)

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
            <p className="text-gray-500 text-sm">Kriterlerinize uyan projeler yayına girdiğinde tercih ettiğiniz kanaldan bildirim alacaksınız.</p>
            <button onClick={() => setSubmitted(false)} className="mt-6 text-sm text-emerald-600 hover:underline">Yeni talep oluştur</button>
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
            <h1 className="text-2xl font-bold text-gray-900">Yatırım Talebi Oluştur</h1>
            <p className="text-gray-500 text-sm mt-1">Kriterlerinize uyan projeler yayına girince bildirim alırsınız.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
                {/* Şehir */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Şehir</label>
                  <div className="flex flex-wrap gap-2">
                    {CITIES.map((c) => (
                      <Chip key={c} label={c} selected={city === c} onClick={() => { setCity(c); setSelectedDistricts([]) }} />
                    ))}
                  </div>
                </div>

                {/* İlçe */}
                {city && DISTRICTS[city] && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">İlçe</label>
                    <div className="flex flex-wrap gap-2">
                      {DISTRICTS[city].map((d) => (
                        <Chip key={d} label={d} selected={selectedDistricts.includes(d)} onClick={() => toggle(selectedDistricts, d, setSelectedDistricts)} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Mülk tipi */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Mülk Tipi</label>
                  <div className="flex flex-wrap gap-2">
                    {PROPERTY_TYPES.map((t) => (
                      <Chip key={t} label={t.charAt(0).toUpperCase() + t.slice(1)} selected={propertyTypes.includes(t)} onClick={() => toggle(propertyTypes, t, setPropertyTypes)} />
                    ))}
                  </div>
                </div>

                {/* Oda tipi */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Oda Sayısı</label>
                  <div className="flex flex-wrap gap-2">
                    {ROOM_TYPES.map((r) => (
                      <Chip key={r} label={r} selected={roomTypes.includes(r)} onClick={() => toggle(roomTypes, r, setRoomTypes)} />
                    ))}
                  </div>
                </div>

                {/* Bütçe */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Bütçe Aralığı (₺)</label>
                  <div className="flex items-center gap-3">
                    <input type="number" placeholder="Min" value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    <span className="text-gray-400">–</span>
                    <input type="number" placeholder="Max" value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
                </div>

                {/* Zaman */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Ne zaman almayı planlıyorsunuz?</label>
                  <div className="flex flex-wrap gap-2">
                    {TIMELINES.map((t) => (
                      <Chip key={t.value} label={t.label} selected={timeline === t.value} onClick={() => setTimeline(t.value)} />
                    ))}
                  </div>
                </div>

                {/* Bildirimler */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Bildirim Tercihi</label>
                  <div className="flex flex-wrap gap-4">
                    {[["E-posta", notifEmail, setNotifEmail], ["SMS", notifSms, setNotifSms]] .map(([label, val, setVal]) => (
                      <label key={label as string} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={val as boolean} onChange={(e) => (setVal as (v: boolean) => void)(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                        <span className="text-sm text-gray-600">{label as string}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Gizlilik notu */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-800">
                    <strong>Gizliliğiniz korunur.</strong> Kimliğiniz müteahhitlere gösterilmez. Müteahhitler yalnızca anonim toplu istatistik görür.
                  </p>
                </div>

                <button onClick={() => setSubmitted(true)}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
                  Talebi Kaydet
                </button>
              </div>
            </div>

            {/* Sağ panel: benzer projeler */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Kriterlerinize benzer projeler</h3>
              <div className="space-y-4">
                {similarProjects.map((p) => <ProjectCard key={p.id} project={p} />)}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
