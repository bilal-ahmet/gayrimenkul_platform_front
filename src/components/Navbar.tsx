"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Menu, X, ChevronDown, LogOut } from "lucide-react";
import { getUser, logout } from "@/lib/auth";
import type { MockUser } from "@/types";

const NAV_LINKS = [
  { href: "/", label: "Projeler" },
  { href: "/pricing", label: "Fiyatlandırma" },
  { href: "/demand", label: "Talep Oluştur" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<MockUser | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    setUser(getUser());
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setUser(null);
    setUserMenuOpen(false);
    router.push("/");
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Yatırım<span className="text-emerald-700">Sahası</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "text-emerald-700 font-semibold"
                    : "text-gray-600 hover:text-emerald-700"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-emerald-700 px-3 py-2 rounded-lg transition-colors"
                >
                  <div className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl border border-gray-200 shadow-lg py-1 z-50">
                    {user.role === "contractor" && (
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Müteahhit Paneli
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-emerald-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 px-4 py-2 rounded-lg transition-colors"
                >
                  Üye Ol
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            aria-label="Menüyü aç/kapat"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`py-2 text-sm font-medium ${isActive(href) ? "text-emerald-700 font-semibold" : "text-gray-700 hover:text-emerald-700"}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="flex gap-3 pt-3 border-t border-gray-200 mt-2">
              {user ? (
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="flex-1 text-center text-sm font-medium text-red-600 border border-red-200 rounded-lg px-4 py-2 hover:bg-red-50"
                >
                  Çıkış Yap
                </button>
              ) : (
                <>
                  <Link href="/login" className="flex-1 text-center text-sm font-medium text-gray-700 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Giriş Yap</Link>
                  <Link href="/register" className="flex-1 text-center text-sm font-medium text-white bg-emerald-700 rounded-lg px-4 py-2 hover:bg-emerald-800" onClick={() => setMenuOpen(false)}>Üye Ol</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
