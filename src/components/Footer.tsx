import Link from "next/link";
import { Home } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Yatırım<span className="text-emerald-400">Sahası</span>
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Projeler</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Fiyatlandırma</Link></li>
              <li><Link href="/demand" className="hover:text-white transition-colors">Talep Oluştur</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Hesap</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="hover:text-white transition-colors">Giriş Yap</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">Üye Ol</Link></li>
              <li><Link href="/register?role=contractor" className="hover:text-white transition-colors">Kurumsal Kayıt</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Kurumsal Panel</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} YatırımSahası. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link href="/gizlilik" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
            <Link href="/kullanim-kosullari" className="hover:text-white transition-colors">Kullanım Koşulları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
