import Link from "next/link";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Başlangıç",
    price: "Ücretsiz",
    sub: "İlk 12 ay",
    featured: false,
    features: [
      "3 aktif proje ilanı",
      "Temel proje sayfası",
      "Bölge talep istatistikleri (genel)",
      "E-posta desteği",
    ],
    cta: "Ücretsiz Başla",
    href: "/register?role=contractor",
  },
  {
    name: "Profesyonel",
    price: "₺4.900",
    sub: "/ ay",
    featured: true,
    features: [
      "Sınırsız proje ilanı",
      "Öncelikli listeleme",
      "Detaylı talep istatistikleri",
      "Alıcı eşleştirme bildirimleri",
      "Proje analitik paneli",
      "Öncelikli destek",
    ],
    cta: "Profesyonel Başla",
    href: "/register?role=contractor",
  },
  {
    name: "Kurumsal",
    price: "₺12.000",
    sub: "/ ay",
    featured: false,
    features: [
      "Profesyonel'in tüm özellikleri",
      "Çoklu kullanıcı hesabı",
      "Özel firma profil sayfası",
      "API erişimi",
      "Hesap yöneticisi",
      "Özel raporlama",
    ],
    cta: "Kurumsal Başla",
    href: "/register?role=contractor",
  },
]

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="eyebrow text-amber-600">Üyelik</span>
            <h1 className="text-4xl md:text-5xl text-gray-900 mt-3 mb-4 text-balance">Sade ve şeffaf fiyatlandırma</h1>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              Kurumsal firmalar projelerini listeler, alıcılar ücretsiz keşfeder.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className={`rounded-2xl border p-7 flex flex-col transition-shadow ${plan.featured ? "border-emerald-700 bg-emerald-950 text-amber-50 shadow-luxe-lg relative grain overflow-hidden" : "bg-white border-gray-200 shadow-luxe"}`}>
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-emerald-950 text-[0.7rem] font-semibold tracking-wide px-4 py-1 rounded-full">
                    Önerilen
                  </div>
                )}
                <div className="mb-6 relative">
                  <h2 className={`text-xl ${plan.featured ? "text-amber-50" : "text-gray-900"}`}>{plan.name}</h2>
                  <div className="mt-2 flex items-end gap-1">
                    <span className={`font-display text-4xl ${plan.featured ? "text-amber-300" : "text-gray-900"}`}>{plan.price}</span>
                    <span className={`text-sm mb-1.5 ${plan.featured ? "text-emerald-100/60" : "text-gray-400"}`}>{plan.sub}</span>
                  </div>
                </div>

                <ul className="space-y-3 flex-1 mb-8 relative">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2.5 text-sm ${plan.featured ? "text-emerald-100/80" : "text-gray-600"}`}>
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.featured ? "text-amber-300" : "text-emerald-600"}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`relative block text-center font-semibold tracking-wide py-3 rounded-full transition-colors text-sm ${plan.featured ? "bg-amber-400 hover:bg-amber-300 text-emerald-950" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-sm text-emerald-800">
            <p className="font-semibold mb-1">Nasıl çalışır?</p>
            <p>Alıcılar platformu ücretsiz kullanır; proje keşfeder, talep oluşturur ve kurumsal firmayla doğrudan iletişime geçer. Bu model, kurumsal firmalar için gerçek satışa dönüşmeyen maliyeti sıfıra indirir; alıcılar içinse aracısız erişimi güvence altına alır.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
