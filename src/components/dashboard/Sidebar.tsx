"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FolderOpen, BarChart2, CreditCard, LogOut, Home, Menu, X } from "lucide-react";
import { useState } from "react";
import { logout } from "@/lib/auth";

const NAV = [
  { href: "/dashboard",          label: "Genel Bakış",      icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projelerim",       icon: FolderOpen },
  { href: "/dashboard/demand",   label: "Bölge Talepleri",  icon: BarChart2 },
  { href: "/dashboard/billing",  label: "Abonelik",         icon: CreditCard },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const NavLinks = () => (
    <>
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
        return (
          <Link key={href} href={href} onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-700/10" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
            <Icon className="w-5 h-5 shrink-0" />
            {label}
          </Link>
        )
      })}
      <button onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors w-full text-left mt-auto">
        <LogOut className="w-5 h-5 shrink-0" />
        Çıkış Yap
      </button>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col bg-white border-r border-gray-200 min-h-screen sticky top-0">
        <div className="p-4 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-700 rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm">YatırımSahası</span>
          </Link>
          <p className="text-xs text-gray-400 mt-1 pl-9">Kurumsal Panel</p>
        </div>
        <nav className="flex-1 flex flex-col gap-1 p-3">
          <NavLinks />
        </nav>
      </aside>

      {/* Mobile topbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-700 rounded-md flex items-center justify-center ring-1 ring-amber-400/30">
            <Home className="w-4 h-4 text-amber-200" />
          </div>
          <span className="font-display text-base text-gray-900">Yatırım<span className="text-amber-600 italic">Sahası</span></span>
        </Link>
        <button onClick={() => setOpen(!open)} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/30" onClick={() => setOpen(false)}>
          <nav className="bg-white w-64 h-full flex flex-col gap-1 p-3 pt-16" onClick={(e) => e.stopPropagation()}>
            <NavLinks />
          </nav>
        </div>
      )}
    </>
  )
}
