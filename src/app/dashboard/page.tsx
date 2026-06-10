"use client";

import { useEffect, useState } from "react";
import { Eye, FolderOpen, Users } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import { getUser } from "@/lib/auth";
import { getContractorProjects } from "@/lib/projects";
import type { MockUser } from "@/types";
import type { Project } from "@/types";

export default function DashboardPage() {
  const [user, setUser] = useState<MockUser | null>(null);
  const [myProjects, setMyProjects] = useState<Project[]>([]);

  useEffect(() => {
    const u = getUser()
    setUser(u)
    if (u?.contractorId) setMyProjects(getContractorProjects(u.contractorId))
  }, []);

  const liveCount = myProjects.filter((p) => p.status === "live").length

  return (
    <main className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Genel Bakış</h1>
        <p className="text-gray-500 text-sm mt-1">
          {user ? `Hoş geldiniz, ${user.name}.` : "Hoş geldiniz."} Bugünkü özet aşağıda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard
          label="Toplam Proje"
          value={String(myProjects.length)}
          icon={<FolderOpen className="w-5 h-5" />}
          sub={`${liveCount} aktif yayında`}
        />
        <StatCard label="Toplam Görüntülenme" value="1.284" icon={<Eye className="w-5 h-5" />} sub="Son 30 gün" />
        <StatCard label="Aktif Talep Eşleşmesi" value="37" icon={<Users className="w-5 h-5" />} sub="Bu ay gelen talepler" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Hızlı Erişim</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <a href="/dashboard/projects/new" className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 transition-colors text-gray-700 hover:text-emerald-700">
            <span>＋</span> Yeni Proje Ekle
          </a>
          <a href="/dashboard/demand" className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 transition-colors text-gray-700 hover:text-emerald-700">
            <span>📊</span> Bölge Taleplerini Gör
          </a>
          <a href="/dashboard/billing" className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 transition-colors text-gray-700 hover:text-emerald-700">
            <span>💳</span> Aboneliği Yönet
          </a>
        </div>
      </div>
    </main>
  );
}
