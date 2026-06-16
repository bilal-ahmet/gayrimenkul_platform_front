"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Heart, Building2 } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/types";
import { contractors } from "@/data/contractors";
import ProgressBar from "./ProgressBar";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/format";

const typeLabel: Record<string, string> = {
  daire: 'Daire', villa: 'Villa', dükkan: 'Dükkan',
  ofis: 'Ofis', rezidans: 'Rezidans', karma: 'Karma',
}

export default function ProjectCard({ project }: { project: Project }) {
  const [fav, setFav] = useState(false)
  const contractor = contractors.find((c) => c.id === project.contractorId)

  return (
    <Link
      href={`/projects/${project.id}`}
      className="block bg-white rounded-2xl border border-gray-200 hover:border-amber-300 hover:shadow-luxe-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-[1.06] transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <Building2 className="w-12 h-12 text-gray-300" />
        )}
        {/* legibility gradient */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge status={project.status} />
        </div>
        <button
          onClick={(e) => { e.preventDefault(); setFav(!fav) }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/85 backdrop-blur rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          aria-label="Favorilere ekle"
        >
          <Heart className={`w-4 h-4 ${fav ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
        </button>
        <div className="absolute bottom-3 left-3 backdrop-blur-sm bg-white/15 text-white text-[0.7rem] tracking-wide uppercase font-medium px-2.5 py-1 rounded-full ring-1 ring-white/25">
          {typeLabel[project.type]}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-3.5">
        <div>
          <h3 className="font-display text-lg leading-snug text-gray-900 group-hover:text-emerald-700 transition-colors">
            {project.name}
          </h3>
          <div className="flex items-center gap-1 mt-1.5 text-gray-500">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs">{project.location.district}, {project.location.city}</span>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-1.5 text-[0.7rem] text-gray-600">
          <span className="bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">{project.sqmRange.min}–{project.sqmRange.max} m²</span>
          {project.roomTypes.slice(0, 2).map((r) => (
            <span key={r} className="bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">{r}</span>
          ))}
          <span className="bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">{project.estimatedDelivery}</span>
        </div>

        <ProgressBar percent={project.completionPercent} />

        {/* Footer */}
        <div className="flex items-end justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="eyebrow text-gray-400">Başlangıç</p>
            <p className="font-display text-xl text-emerald-800 mt-0.5">{formatPrice(project.priceStart)}</p>
          </div>
          {contractor && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="font-medium text-gray-700">{contractor.rating}</span>
              <span className="text-gray-300">·</span>
              <span className="truncate max-w-[80px]">{contractor.name}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
