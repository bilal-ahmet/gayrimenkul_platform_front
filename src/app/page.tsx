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
      <section className="relative overflow-hidden bg-emerald-950 text-amber-50 grain">
        {/* atmospheric brass glow — pulled into the corner, dimmed so it stays atmosphere, not haze */}
        <div className="absolute -top-40 -right-32 h-[26rem] w-[26rem] md:h-[34rem] md:w-[34rem] rounded-full bg-amber-500/[0.08] blur-3xl" />
        {/* directional scrim: keeps the text side deep pine so the headline reads cleanly over the glow.
            Strong across the full width on mobile (headline is full-bleed there); lets the glow breathe on desktop. */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-950/55 md:via-emerald-950/60 md:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="rise eyebrow text-amber-300/90 inline-flex items-center gap-2.5" style={{ animationDelay: "0.05s" }}>
              <span className="h-px w-8 bg-amber-400/60" />
              Türkiye&apos;nin yeni nesil gayrimenkul platformu
            </span>
            <h1 className="rise font-display mt-6 text-5xl md:text-[4.25rem] leading-[1.04] tracking-tight text-balance text-amber-50 [text-shadow:0_2px_30px_rgba(12,20,15,0.7)]" style={{ animationDelay: "0.15s" }}>
              Kurumsal projeler,{" "}
              <span className="italic text-amber-200">doğrudan</span> sizin keşfinizde.
            </h1>
            <p className="rise mt-7 text-lg leading-relaxed text-emerald-100/75 max-w-xl" style={{ animationDelay: "0.28s" }}>
              Aracısız ve şeffaf. Kurumsal firmalar projelerini doğrudan sergiler;
              alıcılar ve yatırımcılar inşaatın ilk gününden keşfeder, anında talep oluşturur.
            </p>
          </div>

          {/* Stats — brass-ruled editorial row */}
          <div className="rise mt-16 md:mt-20 grid grid-cols-3 max-w-2xl divide-x divide-amber-400/20 border-t border-amber-400/20 pt-8" style={{ animationDelay: "0.5s" }}>
            {stats.map((s) => (
              <div key={s.label} className="px-4 first:pl-0">
                <p className="font-display text-3xl md:text-4xl text-amber-50">{s.value}</p>
                <p className="eyebrow mt-2 text-emerald-100/55">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projeler" className="flex-1 bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="eyebrow text-amber-600">Vitrin</span>
              <h2 className="font-display text-3xl md:text-4xl text-gray-900 mt-2">Güncel Projeler</h2>
            </div>
            <Link href="/pricing" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-emerald-700 font-medium hover:text-amber-600 transition-colors">
              Proje eklemek için <span aria-hidden>→</span>
            </Link>
          </div>
          <ProjectGrid projects={projects} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-emerald-900 grain py-20">
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 h-[26rem] w-[44rem] rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow text-amber-300/90">Lansmana özel</span>
          <h2 className="font-display text-4xl md:text-5xl text-amber-50 mt-4 mb-5 text-balance">
            İlk 12 ay <span className="italic text-amber-300">ücretsiz</span>
          </h2>
          <p className="text-emerald-100/75 text-lg mb-9 max-w-xl mx-auto leading-relaxed">
            Tüm kurumsal hesaplar tamamen ücretsiz. Projelerinizi yayınlayın, gerçek alıcı talepleriyle buluşun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?role=contractor" className="bg-amber-400 text-emerald-950 font-semibold px-8 py-3.5 rounded-full hover:bg-amber-300 transition-colors">
              Ücretsiz Başla
            </Link>
            <Link href="/pricing" className="border border-amber-400/40 text-amber-100 font-medium px-8 py-3.5 rounded-full hover:bg-amber-400/10 transition-colors">
              Planları İncele
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
