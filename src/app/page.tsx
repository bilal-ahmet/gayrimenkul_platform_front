import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { projects } from "@/data/projects";

const stats = [
  { label: "Aktif Proje", value: "48" },
  { label: "Yatırımcı Talebi", value: "3.200+" },
  { label: "Kayıtlı Firma", value: "120+" },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-block bg-amber-400 text-amber-900 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Türkiye&apos;nin Yeni Nesil Gayrimenkul Platformu
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              Kurumsal projeler<br />
              <span className="text-emerald-300">doğrudan listede</span>
            </h1>
            <p className="text-lg text-emerald-100 mb-8 max-w-xl">
              Aracısız ve şeffaf. Kurumsal firmalar projelerini doğrudan sergiler; alıcılar ve yatırımcılar inşaatın ilk gününden keşfeder, anında talep oluşturur.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-emerald-800 border-b border-emerald-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-emerald-300 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="flex-1 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Güncel Projeler</h2>
            <Link href="/pricing" className="text-sm text-emerald-700 font-medium hover:underline">
              Proje eklemek için →
            </Link>
          </div>
          <ProjectGrid projects={projects} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            İlk 12 ay ücretsiz
          </h2>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
            Lansmana özel: tüm kurumsal hesaplar tamamen ücretsiz. Projelerinizi yayınlayın, gerçek alıcı talepleriyle buluşun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?role=contractor" className="bg-white text-emerald-700 font-semibold px-8 py-3 rounded-xl hover:bg-emerald-50 transition-colors">
              Ücretsiz Başla
            </Link>
            <Link href="/pricing" className="border border-white/40 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">
              Planları İncele
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
