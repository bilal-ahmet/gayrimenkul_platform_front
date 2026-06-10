"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";
import { saveProject } from "@/lib/projects";

export default function NewProjectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [f, setF] = useState({
    name: "", city: "", district: "", type: "",
    priceStart: "", completion: "", delivery: "",
  })
  const set = (k: keyof typeof f, v: string) => setF((p) => ({ ...p, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const user = getUser()
    if (!user?.contractorId) {
      setError("Oturum bilgisi bulunamadı. Lütfen tekrar giriş yapın.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      saveProject(f, user.contractorId!)
      setLoading(false)
      router.push("/dashboard/projects")
    }, 800)
  }

  return (
    <main className="p-6 md:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Yeni Proje Ekle</h1>
        <p className="text-gray-500 text-sm mt-1">Projeniz incelendikten sonra yayına alınır.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        {[
          { label: "Proje Adı",            id: "name",       placeholder: "Örn: Panorama Residence" },
          { label: "Şehir",                id: "city",       placeholder: "İstanbul" },
          { label: "İlçe",                 id: "district",   placeholder: "Kadıköy" },
          { label: "Başlangıç Fiyatı (₺)", id: "priceStart", placeholder: "4500000" },
          { label: "Tamamlanma %",         id: "completion", placeholder: "65" },
          { label: "Tahmini Teslim",       id: "delivery",   placeholder: "Q3 2026" },
        ].map(({ label, id, placeholder }) => (
          <div key={id}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {label} <span className="text-red-500">*</span>
            </label>
            <input
              required
              placeholder={placeholder}
              value={f[id as keyof typeof f]}
              onChange={(e) => set(id as keyof typeof f, e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Mülk Tipi <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={f.type}
            onChange={(e) => set("type", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option value="">Seçin</option>
            {["daire", "villa", "dükkan", "ofis", "rezidans", "karma"].map((t) => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 border border-gray-300 text-gray-700 text-sm font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
          >
            {loading ? "Kaydediliyor..." : "Projeyi Kaydet"}
          </button>
        </div>
      </form>
    </main>
  )
}
