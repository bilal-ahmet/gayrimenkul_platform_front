import Link from "next/link";
import { Check } from "lucide-react";

export default function DashboardBillingPage() {
  return (
    <main className="p-6 md:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Abonelik</h1>
        <p className="text-gray-500 text-sm mt-1">Mevcut planınız ve yükseltme seçenekleri.</p>
      </div>

      {/* Aktif plan */}
      <div className="bg-emerald-700 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">Aktif Plan</span>
            <h2 className="text-2xl font-bold mt-3">Profesyonel</h2>
            <p className="text-emerald-200 text-sm mt-1">₺4.900 / ay</p>
          </div>
          <span className="text-4xl">🏆</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 text-sm">
          {["Sınırsız proje ilanı","Detaylı talep istatistikleri","Alıcı eşleştirme bildirimleri","Proje analitik paneli"].map((f) => (
            <div key={f} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-300 shrink-0" />
              <span className="text-emerald-100">{f}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 text-xs text-emerald-300">Sonraki ödeme: 10 Temmuz 2026</div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-5 text-sm text-gray-600">
        <p className="font-semibold text-gray-900 mb-3">Plan değiştirmek ister misiniz?</p>
        <p className="mb-4">Kurumsal plana geçerek çoklu kullanıcı, API erişimi ve özel raporlama özelliklerine kavuşun.</p>
        <Link href="/pricing" className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          Tüm Planları İncele
        </Link>
      </div>
    </main>
  )
}
