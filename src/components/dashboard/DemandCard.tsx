interface DemandCardProps {
  district: string
  city: string
  roomType: string
  count: number
  buyPercent: number
  timeline: string
}

export default function DemandCard({ district, city, roomType, count, buyPercent, timeline }: DemandCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-900">{district}, {city}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{roomType} talebi</p>
        </div>
        <span className="text-2xl font-bold text-emerald-700 shrink-0">{count.toLocaleString("tr-TR")}</span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{timeline} içinde almayı planlıyor</span>
          <span className="font-medium text-emerald-700">%{buyPercent}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${buyPercent}%` }} />
        </div>
      </div>
    </div>
  )
}
