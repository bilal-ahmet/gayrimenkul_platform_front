import { notFound } from "next/navigation";
import { MapPin, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Badge from "@/components/ui/Badge";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ConstructionPhases from "@/components/projects/ConstructionPhases";
import UnitTypesSection from "@/components/projects/UnitTypesSection";
import TechnicalSpecs from "@/components/projects/TechnicalSpecs";
import ContractorSection from "@/components/projects/ContractorSection";
import ContactInfoModal from "@/components/projects/ContactInfoModal";
import { projects } from "@/data/projects";
import { contractors } from "@/data/contractors";
import { formatPrice } from "@/lib/format";

const typeLabel: Record<string, string> = {
  daire: "Daire", villa: "Villa", dükkan: "Dükkan",
  ofis: "Ofis", rezidans: "Rezidans", karma: "Karma",
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();
  const contractor = contractors.find((c) => c.id === project.contractorId);

  // Sağ kenar çubuğu özetini bağımsız bölümlerden türet → tek kaynak, tutarlı veriler
  const uts = project.unitTypes ?? [];
  const totalUnits = uts.reduce((s, u) => s + u.count, 0) || project.totalUnits;
  const soldUnits = uts.reduce((s, u) => s + u.sold, 0) || project.soldUnits;
  const minM2 = uts.length ? Math.min(...uts.map((u) => u.m2.min)) : project.sqmRange.min;
  const maxM2 = uts.length ? Math.max(...uts.map((u) => u.m2.max)) : project.sqmRange.max;
  const priceStart = uts.length ? Math.min(...uts.map((u) => u.priceFrom)) : project.priceStart;
  const roomTypes = uts.length ? uts.map((u) => u.oda) : project.roomTypes;
  const galleryImages = [project.imageUrl, ...(project.gallery ?? [])].filter(Boolean) as string[];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sol kolon */}
            <div className="lg:col-span-2 space-y-6">
              <ProjectGallery
                images={galleryImages}
                alt={project.name}
                badge={<Badge status={project.status} />}
              />

              {/* Başlık */}
              <div>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge status={project.status} />
                      <span className="text-xs text-gray-400">{typeLabel[project.type]}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                    <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
                      <MapPin className="w-4 h-4" />
                      {project.location.district}, {project.location.city}
                    </div>
                  </div>
                  {contractor && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl px-3 py-2">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-medium">{contractor.rating}</span>
                      <span className="text-gray-400">·</span>
                      <span>{contractor.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* İnşaat aşaması */}
              {project.phaseDetails && project.phaseDetails.length > 0 && (
                <ConstructionPhases
                  phaseDetails={project.phaseDetails}
                  overallPercent={project.completionPercent}
                  delivery={project.estimatedDelivery}
                  occupancyReady={project.occupancyReady}
                />
              )}

              {/* Bağımsız bölümler */}
              <UnitTypesSection unitTypes={uts} />

              {/* Teknik şartname */}
              {project.techSpecs && <TechnicalSpecs specs={project.techSpecs} />}

              {/* İnşaat firması */}
              {contractor && <ContractorSection contractor={contractor} />}
            </div>

            {/* Sağ kenar çubuğu */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-20 z-20">
                <p className="text-sm text-gray-500">Başlangıç fiyatı</p>
                <p className="text-3xl font-bold text-emerald-700 mt-1">{formatPrice(priceStart)}</p>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between"><span>Alan</span><span className="font-medium">{minM2}–{maxM2} m²</span></div>
                  {roomTypes.length > 0 && (
                    <div className="flex justify-between gap-3"><span className="shrink-0">Oda Tipleri</span><span className="font-medium text-right">{roomTypes.join(", ")}</span></div>
                  )}
                  <div className="flex justify-between"><span>Toplam Bağımsız</span><span className="font-medium">{totalUnits} adet</span></div>
                  <div className="flex justify-between"><span>Satılan</span><span className="font-medium text-gray-800">{soldUnits} / {totalUnits}</span></div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-500">
                  <p className="font-medium text-gray-700">Ödeme Planı Seçenekleri</p>
                  <p>• Peşin (%3 indirim)</p>
                  <p>• 12 – 24 ay taksit</p>
                  <p>• Banka finansmanı</p>
                </div>

                {contractor && <ContactInfoModal contractor={contractor} />}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
