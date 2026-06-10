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
      className="block bg-white rounded-2xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all overflow-hidden group"
    >
      {/* Thumbnail */}
      <div className="relative h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <Building2 className="w-12 h-12 text-gray-300" />
        )}
        <div className="absolute top-3 left-3">
          <Badge status={project.status} />
        </div>
        <button
          onClick={(e) => { e.preventDefault(); setFav(!fav) }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50 transition-colors"
          aria-label="Favorilere ekle"
        >
          <Heart className={`w-4 h-4 ${fav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          {typeLabel[project.type]}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-emerald-700 transition-colors">
            {project.name}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-gray-500">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-xs">{project.location.district}, {project.location.city}</span>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
          <span className="bg-gray-50 px-2 py-0.5 rounded">{project.sqmRange.min}–{project.sqmRange.max} m²</span>
          {project.roomTypes.slice(0, 2).map((r) => (
            <span key={r} className="bg-gray-50 px-2 py-0.5 rounded">{r}</span>
          ))}
          <span className="bg-gray-50 px-2 py-0.5 rounded">{project.estimatedDelivery}</span>
        </div>

        <ProgressBar percent={project.completionPercent} />

        {/* Footer */}
        <div className="flex items-end justify-between pt-1">
          <div>
            <p className="text-xs text-gray-400">Başlangıç fiyatı</p>
            <p className="text-base font-bold text-emerald-700">{formatPrice(project.priceStart)}</p>
          </div>
          {contractor && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{contractor.rating}</span>
              <span className="text-gray-300">·</span>
              <span className="truncate max-w-[80px]">{contractor.name}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
