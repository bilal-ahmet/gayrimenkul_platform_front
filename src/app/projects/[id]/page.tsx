import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Star, Building2, Calendar, CheckCircle2, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/projects/ProgressBar";
import ContactInfoModal from "@/components/projects/ContactInfoModal";
import { projects } from "@/data/projects";
import { contractors } from "@/data/contractors";
import { formatPrice } from "@/lib/format";
import type { ConstructionPhase } from "@/types";

const PHASES: { key: ConstructionPhase; label: string }[] = [
  { key: "temel",    label: "Temel" },
  { key: "kaba",     label: "Kaba İnşaat" },
  { key: "ince",     label: "İnce İşler" },
  { key: "dis_cephe",label: "Dış Cephe" },
  { key: "peyzaj",   label: "Peyzaj" },
  { key: "teslim",   label: "Teslim" },
]

const PHASE_ORDER: ConstructionPhase[] = ["temel","kaba","ince","dis_cephe","peyzaj","teslim"]

const mockUnits = [
  { kat: 1, m2: 95,  oda: "2+1", durum: "Satıldı" },
  { kat: 2, m2: 110, oda: "3+1", durum: "Satışta" },
  { kat: 3, m2: 110, oda: "3+1", durum: "Satışta" },
  { kat: 4, m2: 145, oda: "4+1", durum: "Satıldı" },
  { kat: 5, m2: 145, oda: "4+1", durum: "Satışta" },
  { kat: 6, m2: 185, oda: "4+1", durum: "Opsiyonlu" },
]

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) notFound()
  const contractor = contractors.find((c) => c.id === project.contractorId)
  const phaseIdx = PHASE_ORDER.indexOf(project.phase)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project image */}
              <div className="relative bg-gray-200 rounded-2xl h-72 overflow-hidden flex flex-col items-center justify-center gap-3 text-gray-400">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 700px"
                    priority
                  />
                ) : (
                  <>
                    <Building2 className="w-16 h-16" />
                    <span className="text-sm">Proje görseli</span>
                  </>
                )}
              </div>

              {/* Title */}
              <div>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge status={project.status} />
                      <span className="text-xs text-gray-400 capitalize">{project.type}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                    <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
                      <MapPin className="w-4 h-4" />
                      {project.location.district}, {project.location.city}
                    </div>
                  </div>
                  {contractor && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl px-3 py-2">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-medium">{contractor.rating}</span>
                      <span className="text-gray-400">·</span>
                      <span>{contractor.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* İnşaat Aşaması */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="font-semibold text-gray-900 mb-5">İnşaat Aşaması</h2>
                <ProgressBar percent={project.completionPercent} />
                <div className="mt-5 flex items-center justify-between relative">
                  <div className="absolute left-0 right-0 top-3 h-0.5 bg-gray-100" />
                  {PHASES.map((ph, i) => {
                    const done = i < phaseIdx
                    const active = i === phaseIdx
                    return (
                      <div key={ph.key} className="flex flex-col items-center gap-1.5 relative z-10">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${done ? "bg-emerald-600 border-emerald-600" : active ? "bg-white border-emerald-600" : "bg-white border-gray-300"}`}>
                          {done && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                          {active && <div className="w-2 h-2 rounded-full bg-emerald-600" />}
                        </div>
                        <span className={`text-xs ${active ? "font-semibold text-emerald-700" : done ? "text-emerald-600" : "text-gray-400"}`}>{ph.label}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Tahmini Teslim: <strong>{project.estimatedDelivery}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>İskan: <strong>{project.occupancyReady ? "Hazır" : "Devam ediyor"}</strong></span>
                  </div>
                </div>
              </div>

              {/* Bağımsız Bölümler */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Bağımsız Bölümler (Örnek)</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 border-b border-gray-100">
                        <th className="pb-2 font-medium">Kat</th>
                        <th className="pb-2 font-medium">m²</th>
                        <th className="pb-2 font-medium">Oda</th>
                        <th className="pb-2 font-medium">Durum</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {mockUnits.map((u, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="py-2.5 text-gray-700">{u.kat}. Kat</td>
                          <td className="py-2.5 text-gray-700">{u.m2} m²</td>
                          <td className="py-2.5 text-gray-700">{u.oda}</td>
                          <td className="py-2.5">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${u.durum === "Satışta" ? "bg-emerald-100 text-emerald-700" : u.durum === "Satıldı" ? "bg-gray-100 text-gray-500" : "bg-amber-100 text-amber-700"}`}>
                              {u.durum}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4">
              {/* Fiyat kartı */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-20">
                <p className="text-sm text-gray-500">Başlangıç fiyatı</p>
                <p className="text-3xl font-bold text-emerald-700 mt-1">{formatPrice(project.priceStart)}</p>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between"><span>Alan</span><span className="font-medium">{project.sqmRange.min}–{project.sqmRange.max} m²</span></div>
                  {project.roomTypes.length > 0 && (
                    <div className="flex justify-between"><span>Oda Tipleri</span><span className="font-medium">{project.roomTypes.join(", ")}</span></div>
                  )}
                  <div className="flex justify-between"><span>Toplam Bağımsız</span><span className="font-medium">{project.totalUnits} adet</span></div>
                  <div className="flex justify-between"><span>Satılan</span><span className="font-medium text-gray-800">{project.soldUnits} / {project.totalUnits}</span></div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-500">
                  <p className="font-medium text-gray-700">Ödeme Planı Seçenekleri</p>
                  <p>• Peşin (%3 indirim)</p>
                  <p>• 12 – 24 ay taksit</p>
                  <p>• Banka finansmanı</p>
                  <p className="text-gray-400 italic mt-1">Platform ödeme transferi yapmaz. Bilgi amaçlıdır.</p>
                </div>

                {contractor && <ContactInfoModal contractor={contractor} />}
              </div>

              {/* Firma */}
              {contractor && (
                <div className="bg-white rounded-2xl border border-gray-200 p-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Firma</h3>
                  <p className="font-medium text-gray-900">{contractor.name}</p>
                  <div className="flex items-center gap-1 mt-1 text-sm">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-medium">{contractor.rating}</span>
                    <span className="text-gray-400">· {contractor.projectCount} proje</span>
                  </div>
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
