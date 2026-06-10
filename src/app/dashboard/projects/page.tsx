"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import ProjectListItem from "@/components/dashboard/ProjectListItem";
import { getContractorProjects } from "@/lib/projects";
import { getUser } from "@/lib/auth";
import type { Project } from "@/types";

export default function DashboardProjectsPage() {
  const [myProjects, setMyProjects] = useState<Project[]>([])

  useEffect(() => {
    const user = getUser()
    if (!user?.contractorId) return
    setMyProjects(getContractorProjects(user.contractorId))
  }, [])

  return (
    <main className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projelerim</h1>
          <p className="text-gray-500 text-sm mt-1">{myProjects.length} proje listelendi</p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Yeni Proje Ekle
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-4">
        {myProjects.length === 0 ? (
          <p className="text-center py-12 text-gray-400 text-sm">Henüz proje eklenmedi.</p>
        ) : (
          myProjects.map((p) => <ProjectListItem key={p.id} project={p} />)
        )}
      </div>
    </main>
  )
}
