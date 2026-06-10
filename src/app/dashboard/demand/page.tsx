import { ShieldCheck } from "lucide-react";
import DemandCard from "@/components/dashboard/DemandCard";

const DEMAND_DATA = [
  { district: "Kadıköy",  city: "İstanbul", roomType: "2+1", count: 847,  buyPercent: 62, timeline: "3 ay" },
  { district: "Çankaya",  city: "Ankara",   roomType: "3+1", count: 612,  buyPercent: 48, timeline: "6 ay" },
  { district: "Karşıyaka",city: "İzmir",    roomType: "2+1", count: 491,  buyPercent: 71, timeline: "3 ay" },
  { district: "Konyaaltı",city: "Antalya",  roomType: "4+1", count: 238,  buyPercent: 35, timeline: "12 ay" },
  { district: "Nilüfer",  city: "Bursa",    roomType: "3+1", count: 183,  buyPercent: 55, timeline: "6 ay" },
  { district: "Beşiktaş", city: "İstanbul", roomType: "1+1", count: 1240, buyPercent: 44, timeline: "3 ay" },
]

export default function DashboardDemandPage() {
  return (
    <main className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bölge Talepleri</h1>
        <p className="text-gray-500 text-sm mt-1">Platforma gelen anonim alıcı talep istatistikleri.</p>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-4 flex gap-3 mb-8">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-sm text-emerald-800">
          <p className="font-semibold">Tüm veriler anonimdir</p>
          <p className="mt-0.5">Bireysel alıcı kimliği hiçbir zaman gösterilmez. Buradaki istatistikler yalnızca toplu ve anonim bölge taleplerini yansıtır.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEMAND_DATA.map((d, i) => <DemandCard key={i} {...d} />)}
      </div>
    </main>
  )
}
