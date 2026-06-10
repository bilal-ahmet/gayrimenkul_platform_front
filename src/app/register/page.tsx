"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { register } from "@/lib/auth";

type Role = "buyer" | "contractor";

const ILLER = ["Adana","Ankara","Antalya","Bursa","Denizli","Diyarbakır","Eskişehir","Gaziantep","İstanbul","İzmir","Kayseri","Kocaeli","Konya","Malatya","Mersin","Samsun","Trabzon","Şanlıurfa"];

function Field({ label, id, type="text", required=false, placeholder, value, onChange, hint }: {
  label: string; id: string; type?: string; required?: boolean;
  placeholder?: string; value: string; onChange: (v: string) => void; hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input id={id} type={type} required={required} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}

function RegisterForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [role, setRole] = useState<Role>("buyer")
  const [loading, setLoading] = useState(false)
  const [f, setF] = useState({ name: "", email: "", phone: "", password: "", confirm: "",
    firmaAdi: "", vergiNo: "", vergiDairesi: "", ticaretSicilNo: "", mersisNo: "",
    adres: "", il: "", ilce: "", webSitesi: "", deneyim: "", sozlesme: false })

  useEffect(() => {
    if (searchParams.get("role") === "contractor") setRole("contractor")
  }, [searchParams])

  const set = (k: keyof typeof f, v: string | boolean) => setF((p) => ({ ...p, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (f.password !== f.confirm) { alert("Şifreler eşleşmiyor."); return }
    setLoading(true)
    setTimeout(() => {
      register(f.name, f.email, f.password, role)
      setLoading(false)
      router.push("/login?registered=1")
    }, 1000)
  }

  return (
    <>
      {/* Rol Seçimi */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {([["buyer","👤","Alıcı / Yatırımcı","Proje keşfet, talep oluştur"],["contractor","🏗️","Müteahhit","Proje listele, talepleri gör"]] as const).map(([r, icon, title, desc]) => (
          <button key={r} type="button" onClick={() => setRole(r)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${role === r ? (r === "contractor" ? "border-amber-500 bg-amber-50" : "border-emerald-600 bg-emerald-50") : "border-gray-200 hover:border-gray-300"}`}>
            <span className="text-2xl">{icon}</span>
            <span className={`text-sm font-semibold ${role === r ? (r === "contractor" ? "text-amber-700" : "text-emerald-700") : "text-gray-600"}`}>{title}</span>
            <span className="text-xs text-gray-400 text-center leading-tight">{desc}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Kişisel */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Kişisel Bilgiler</h3>
          <div className="space-y-4">
            <Field label="Ad Soyad" id="name" required placeholder="Adınız Soyadınız" value={f.name} onChange={(v) => set("name", v)} />
            <Field label="E-posta" id="email" type="email" required placeholder="ornek@email.com" value={f.email} onChange={(v) => set("email", v)} />
            <Field label="Telefon" id="phone" type="tel" required placeholder="05XX XXX XX XX" value={f.phone} onChange={(v) => set("phone", v)} />
          </div>
        </div>

        {/* Müteahhit alanları */}
        {role === "contractor" && (
          <div className="border-t border-gray-100 pt-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-amber-500 rounded-full" />
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">İşletme Bilgileri</h3>
            </div>
            <div className="space-y-4 bg-amber-50 rounded-xl p-4 border border-amber-100">
              <Field label="Firma / İşletme Adı" id="firmaAdi" required placeholder="ABC İnşaat A.Ş." value={f.firmaAdi} onChange={(v) => set("firmaAdi", v)} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Vergi Numarası" id="vergiNo" required placeholder="1234567890" value={f.vergiNo} onChange={(v) => set("vergiNo", v)} hint="10 haneli" />
                <Field label="Vergi Dairesi" id="vergiDairesi" required placeholder="Kadıköy VD" value={f.vergiDairesi} onChange={(v) => set("vergiDairesi", v)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Ticaret Sicil No" id="ticaretSicilNo" required placeholder="123456" value={f.ticaretSicilNo} onChange={(v) => set("ticaretSicilNo", v)} />
                <Field label="MERSİS No" id="mersisNo" placeholder="0123456789012345" value={f.mersisNo} onChange={(v) => set("mersisNo", v)} hint="İsteğe bağlı" />
              </div>
              <Field label="Firma Adresi" id="adres" required placeholder="Mahalle, Cadde, No" value={f.adres} onChange={(v) => set("adres", v)} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="il" className="block text-sm font-medium text-gray-700 mb-1.5">İl <span className="text-red-500">*</span></label>
                  <select id="il" required value={f.il} onChange={(e) => set("il", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                    <option value="">İl seçin</option>
                    {ILLER.map((il) => <option key={il} value={il}>{il}</option>)}
                  </select>
                </div>
                <Field label="İlçe" id="ilce" required placeholder="İlçe" value={f.ilce} onChange={(v) => set("ilce", v)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Web Sitesi" id="webSitesi" type="url" placeholder="https://firma.com" value={f.webSitesi} onChange={(v) => set("webSitesi", v)} hint="İsteğe bağlı" />
                <div>
                  <label htmlFor="deneyim" className="block text-sm font-medium text-gray-700 mb-1.5">Sektör Deneyimi</label>
                  <select id="deneyim" value={f.deneyim} onChange={(e) => set("deneyim", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                    <option value="">Seçin</option>
                    <option value="0-5">0 – 5 yıl</option>
                    <option value="5-10">5 – 10 yıl</option>
                    <option value="10-20">10 – 20 yıl</option>
                    <option value="20+">20 yıl ve üzeri</option>
                  </select>
                </div>
              </div>
              <p className="text-xs text-amber-700 bg-amber-100 rounded-lg px-3 py-2">
                ⚠️ Müteahhit hesabınız incelendikten sonra aktif hale gelecektir.
              </p>
            </div>
          </div>
        )}

        {/* Şifre */}
        <div className="border-t border-gray-100 pt-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Şifre</h3>
          <div className="space-y-4">
            <Field label="Şifre" id="password" type="password" required placeholder="En az 8 karakter" value={f.password} onChange={(v) => set("password", v)} hint="Büyük/küçük harf ve rakam içermeli" />
            <Field label="Şifre Tekrar" id="confirm" type="password" required placeholder="Şifrenizi tekrar girin" value={f.confirm} onChange={(v) => set("confirm", v)} />
          </div>
        </div>

        <div className="flex items-start gap-3">
          <input id="sozlesme" type="checkbox" required checked={f.sozlesme} onChange={(e) => set("sozlesme", e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
          <label htmlFor="sozlesme" className="text-sm text-gray-600 leading-relaxed">
            <Link href="#" className="text-emerald-600 hover:underline">Kullanım Koşulları</Link>
            {" "}ve{" "}
            <Link href="#" className="text-emerald-600 hover:underline">Gizlilik Politikası</Link>
            &apos;nı okudum ve kabul ediyorum.
          </label>
        </div>

        <button type="submit" disabled={loading}
          className={`w-full font-semibold py-3 rounded-xl transition-colors text-sm text-white ${role === "contractor" ? "bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300" : "bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400"}`}>
          {loading ? "Kaydediliyor..." : role === "contractor" ? "Müteahhit Hesabı Oluştur" : "Üye Ol"}
        </button>
      </form>
    </>
  )
}

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-12 px-4">
        <div className="w-full max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Hesap oluştur</h1>
              <p className="text-gray-500 text-sm mt-1">
                Zaten hesabınız var mı?{" "}
                <Link href="/login" className="text-emerald-600 font-medium hover:underline">Giriş yapın</Link>
              </p>
            </div>
            <Suspense fallback={<div className="text-center py-8 text-gray-400 text-sm">Yükleniyor...</div>}>
              <RegisterForm />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
