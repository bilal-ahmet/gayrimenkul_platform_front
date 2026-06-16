import Link from "next/link";
import { Home } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-emerald-950 text-emerald-100/70 mt-auto grain">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 max-w-sm">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-9 h-9 rounded-md bg-amber-500/15 ring-1 ring-amber-400/30 flex items-center justify-center">
                <Home className="w-4 h-4 text-amber-300" />
              </span>
              <span className="font-display text-2xl text-amber-50">
                Yatırım<span className="text-amber-400 italic">Sahası</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-emerald-100/55">
              Aracısız ve şeffaf. Kurumsal firmalar projelerini doğrudan sergiler;
              yatırımcılar inşaatın ilk gününden keşfeder.
            </p>
          </div>

          <div>
            <h3 className="eyebrow text-amber-300/80 mb-5">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-amber-200 transition-colors">Projeler</Link></li>
              <li><Link href="/pricing" className="hover:text-amber-200 transition-colors">Fiyatlandırma</Link></li>
              <li><Link href="/demand" className="hover:text-amber-200 transition-colors">Talep Oluştur</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-amber-300/80 mb-5">Hesap</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/login" className="hover:text-amber-200 transition-colors">Giriş Yap</Link></li>
              <li><Link href="/register" className="hover:text-amber-200 transition-colors">Üye Ol</Link></li>
              <li><Link href="/register?role=contractor" className="hover:text-amber-200 transition-colors">Kurumsal Kayıt</Link></li>
              <li><Link href="/dashboard" className="hover:text-amber-200 transition-colors">Kurumsal Panel</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-400/15 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-100/45">
          <p>© {new Date().getFullYear()} YatırımSahası. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link href="/gizlilik" className="hover:text-amber-200 transition-colors">Gizlilik Politikası</Link>
            <Link href="/kullanim-kosullari" className="hover:text-amber-200 transition-colors">Kullanım Koşulları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
