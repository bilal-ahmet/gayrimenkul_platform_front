import type { ConstructionPhase, PhaseDetail, TechSpecGroup } from '@/types'

// Aşama galerisi ve teknik şartname için paylaşılan içerik.
// İnşaat aşaması görselleri /public/phases altındaki GERÇEK şantiye fotoğraflarıdır
// (Paye Sakarya şantiyesinin 2023–2026 kronolojik kayıtları). Diğer projeler için
// temsilî olarak kullanılır. Teknik şartname değerleri sektörde kullanılan gerçek
// marka ve standart adlarıyla, kurumsal güven amacıyla hazırlanmıştır.

export const PHASE_ORDER: ConstructionPhase[] = [
  'temel', 'kaba', 'ince', 'dis_cephe', 'peyzaj', 'teslim',
]

export const PHASE_LABELS: Record<ConstructionPhase, string> = {
  temel: 'Temel',
  kaba: 'Kaba İnşaat',
  ince: 'İnce İşler',
  dis_cephe: 'Dış Cephe',
  peyzaj: 'Peyzaj',
  teslim: 'Teslim',
}

// Her aşamanın iş adımları ve (varsa) kanonik şantiye görselleri.
const STEP_DEFS: Record<ConstructionPhase, { label: string; images: string[] }[]> = {
  temel: [
    { label: 'Zemin Etüdü', images: ['/phases/temel-1.jpg'] },
    { label: 'Kazı (Hafriyat) İşleri', images: ['/phases/temel-2.jpg'] },
    { label: 'Zemin İyileştirme ve Sıkıştırma', images: ['/phases/temel-3.jpg'] },
    { label: 'Radye Temel Betonu', images: ['/phases/temel-1.jpg'] },
  ],
  kaba: [
    { label: 'Kolon ve Perde Kalıpları', images: ['/phases/kaba-1.jpg'] },
    { label: 'Donatı (Demir) Montajı', images: ['/phases/kaba-2.jpg'] },
    { label: 'Döşeme Betonu Dökümü', images: ['/phases/kaba-3.jpg'] },
    { label: 'Karkas / Kat Çıkımı', images: ['/phases/kaba-4.jpg'] },
  ],
  ince: [
    { label: 'Duvar Örme', images: ['/phases/ince-1.jpg'] },
    { label: 'Sıva ve Şap', images: ['/phases/ince-2.jpg'] },
    { label: 'Mekanik & Elektrik Tesisat', images: ['/phases/ince-1.jpg'] },
    { label: 'Alçı, Boya ve Kaplama', images: ['/phases/ince-2.jpg'] },
  ],
  dis_cephe: [
    { label: 'Isı Yalıtımı (Mantolama)', images: ['/phases/dis-cephe-1.jpg'] },
    { label: 'Cephe Kaplama', images: ['/phases/dis-cephe-2.jpg'] },
    { label: 'Doğrama ve Cam Montajı', images: ['/phases/dis-cephe-3.jpg'] },
  ],
  peyzaj: [
    { label: 'Çevre Düzenleme', images: ['/phases/peyzaj-1.jpg'] },
    { label: 'Yeşil Alan ve Bitkilendirme', images: ['/phases/peyzaj-2.jpg'] },
    { label: 'Yürüyüş Yolları ve Aydınlatma', images: ['/phases/peyzaj-1.jpg'] },
  ],
  teslim: [
    { label: 'Genel Temizlik ve Son Kontroller', images: [] },
    { label: 'İskan (Yapı Kullanma) Ruhsatı', images: [] },
    { label: 'Anahtar Teslim', images: [] },
  ],
}

/**
 * Projenin güncel aşamasına ve aktif aşamadaki ilerlemeye göre aşama galerisini üretir.
 * - Geçmiş aşamalar: %100, tüm adımlar görselli.
 * - Aktif aşama: `activePercent`; ilk adımlar görselli, kalanlar "henüz yüklenmedi".
 * - Gelecek aşamalar: %0, görsel yok.
 */
export function buildPhaseDetails(
  projectPhase: ConstructionPhase,
  activePercent = 60,
): PhaseDetail[] {
  const idx = PHASE_ORDER.indexOf(projectPhase)
  return PHASE_ORDER.map((key, i) => {
    const defs = STEP_DEFS[key]
    let percent: number
    let withImages: number
    if (i < idx) {
      percent = 100
      withImages = defs.length
    } else if (i === idx) {
      percent = activePercent
      withImages = Math.max(1, Math.round((defs.length * activePercent) / 100))
    } else {
      percent = 0
      withImages = 0
    }
    return {
      key,
      percent,
      steps: defs.map((d, si) => ({
        label: d.label,
        images: si < withImages ? d.images : [],
      })),
    }
  })
}

/** Kurumsal güven için standart bina teknik şartnamesi (gerçek marka/standart adları). */
export const STANDARD_TECH_SPECS: TechSpecGroup[] = [
  {
    category: 'Yapısal Sistem',
    items: [
      { label: 'Taşıyıcı Sistem', value: 'Betonarme perde-kolon, TBDY-2018 deprem yönetmeliğine tam uyumlu' },
      { label: 'Beton Sınıfı', value: 'C30/C37 hazır beton (Akçansa / Nuh Çimento)' },
      { label: 'Donatı Çeliği', value: 'B500C nervürlü inşaat demiri' },
      { label: 'Temel', value: 'Zemin etüdü raporlu radye jeneral temel' },
    ],
  },
  {
    category: 'Isı & Ses Yalıtımı',
    items: [
      { label: 'Dış Cephe', value: '5 cm taş yünü / XPS mantolama (İzocam / Mardav)' },
      { label: 'Çatı', value: 'Taş yünü ısı yalıtımı + su yalıtım membranı' },
      { label: 'Ses Yalıtımı', value: 'Şap altı ses yalıtım şiltesi, daireler arası ek izolasyon' },
      { label: 'Cam', value: 'Isıcam Konfor Low-E çift cam (Şişecam)' },
    ],
  },
  {
    category: 'Cephe & Doğrama',
    items: [
      { label: 'Pencere Doğrama', value: 'PVC çift contalı sistem (Winsa / Egepen Deceuninck)' },
      { label: 'Cephe Kaplama', value: 'Akrilik dekoratif sıva + kompozit panel' },
      { label: 'Daire Giriş Kapısı', value: 'Isı-ses yalıtımlı çelik kapı, kırılmaz silindir' },
    ],
  },
  {
    category: 'Mekanik Tesisat',
    items: [
      { label: 'Isıtma', value: 'Doğalgaz kombi / merkezi sistem (ECA / Baymak)' },
      { label: 'Sıhhi Tesisat', value: 'PPRC temiz su borulaması, gizli rezervuar (VitrA / Artema)' },
      { label: 'Asansör', value: 'TS EN 81 uyumlu, frekans kontrollü (Schindler / Kone)' },
    ],
  },
  {
    category: 'Elektrik & Akıllı Sistemler',
    items: [
      { label: 'Anahtar & Priz', value: 'Legrand / Viko sıva altı sistem' },
      { label: 'Güvenlik', value: 'Görüntülü diafon, kartlı/şifreli geçiş kontrolü' },
      { label: 'Yangın', value: 'Yangın algılama, uyarı ve söndürme sistemi' },
      { label: 'Enerji', value: 'Ortak alan jeneratör beslemesi, LED aydınlatma' },
    ],
  },
]

/** Villa projeleri için ek/üst segment şartname (özel havuz, yerden ısıtma vb.). */
export const VILLA_TECH_SPECS: TechSpecGroup[] = [
  STANDARD_TECH_SPECS[0],
  STANDARD_TECH_SPECS[1],
  STANDARD_TECH_SPECS[2],
  {
    category: 'Mekanik & Konfor',
    items: [
      { label: 'Isıtma', value: 'Yerden ısıtma sistemi, oda bazlı termostat kontrolü' },
      { label: 'İklimlendirme', value: 'VRV / VRF merkezi klima altyapısı (Daikin / Mitsubishi)' },
      { label: 'Özel Havuz', value: 'Her villaya özel açık yüzme havuzu, otomatik dozajlama' },
      { label: 'Asansör', value: 'Villa içi özel asansör altyapısı (opsiyonel)' },
    ],
  },
  {
    category: 'Akıllı Ev & Güvenlik',
    items: [
      { label: 'Akıllı Ev', value: 'KNX akıllı ev otomasyonu (aydınlatma, perde, senaryo)' },
      { label: 'Güvenlik', value: '7/24 site güvenliği, çevre CCTV, bahçe hareket sensörleri' },
      { label: 'Bahçe', value: 'Otomatik sulama sistemi, peyzaj aydınlatması' },
    ],
  },
]
