import Link from "next/link";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-emerald-950 grain relative flex flex-col items-center justify-center px-4 text-center text-amber-50">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="relative">
        <div className="w-14 h-14 bg-amber-500/15 ring-1 ring-amber-400/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <SearchX className="w-7 h-7 text-amber-300" />
        </div>
        <h1 className="font-display text-7xl md:text-8xl text-amber-300 mb-2 italic">404</h1>
        <h2 className="font-display text-2xl text-amber-50 mb-3">Sayfa bulunamadı</h2>
        <p className="text-emerald-100/70 max-w-sm mb-8 mx-auto leading-relaxed">
          Aradığınız sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-semibold px-7 py-3 rounded-full transition-colors"
        >
          <Home className="w-4 h-4" />
          Anasayfaya Dön
        </Link>
      </div>
    </div>
  );
}
