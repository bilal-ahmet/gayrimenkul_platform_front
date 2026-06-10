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
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sade ve şeffaf fiyatlandırma</h1>
            <p className="text-gray-500 max-w-xl mx-auto">
              Platform ödeme transferi yapmaz. Tek gelir kaynağı müteahhit aboneliğidir. Alıcı-satıcı ödemeleri doğrudan IBAN ile gerçekleşir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className={`bg-white rounded-2xl border p-6 flex flex-col ${plan.featured ? "border-emerald-500 ring-2 ring-emerald-500 relative" : "border-gray-200"}`}>
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Önerilen
                  </div>
                )}
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">{plan.name}</h2>
                  <div className="mt-2 flex items-end gap-1">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-400 text-sm mb-1">{plan.sub}</span>
                  </div>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block text-center font-semibold py-3 rounded-xl transition-colors text-sm ${plan.featured ? "bg-emerald-700 hover:bg-emerald-800 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm text-amber-800">
            <p className="font-semibold mb-1">Önemli Not</p>
            <p>YatırımSahası, alıcı ve satıcı arasında para transferine aracılık etmez. Platform yalnızca listeleme ve talep eşleştirme hizmeti sunar. Tüm ödemeler taraflar arasında doğrudan IBAN ile gerçekleşir. Platformun tek gelir kaynağı müteahhit firmalardan alınan abonelik ücretidir.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
