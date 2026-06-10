import Link from "next/link";
import type { Project } from "@/types";
import Badge from "@/components/ui/Badge";

function formatPrice(n: number) {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n)
}

export default function ProjectListItem({ project }: { project: Project }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-gray-100 last:border-0 flex-wrap">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0 text-gray-400 text-lg">🏗</div>
        <div className="min-w-0">
          <Link href={`/projects/${project.id}`} className="text-sm font-medium text-gray-900 hover:text-emerald-700 truncate block">{project.name}</Link>
          <p className="text-xs text-gray-400">{project.location.district}, {project.location.city}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm shrink-0">
        <Badge status={project.status} />
        <span className="text-gray-600 font-medium hidden sm:block">{formatPrice(project.priceStart)}</span>
        <span className="text-gray-500 hidden sm:block">{project.soldUnits}/{project.totalUnits} satış</span>
        <span className="text-emerald-600 font-medium">%{project.completionPercent}</span>
      </div>
    </div>
  )
}
