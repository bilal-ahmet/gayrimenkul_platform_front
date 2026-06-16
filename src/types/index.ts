export type ProjectStatus = 'live' | 'review' | 'draft' | 'completed'
export type PropertyType = 'daire' | 'villa' | 'dükkan' | 'ofis' | 'rezidans' | 'karma'
export type ConstructionPhase = 'temel' | 'kaba' | 'ince' | 'dis_cephe' | 'peyzaj' | 'teslim'

/** Bağımsız bölüm tipi — kat tablosunun yerine geçen, oda tipi bazlı kart verisi */
export interface UnitType {
  /** "1+1", "2+1" ya da villa için "5+1 Tripleks Villa" */
  oda: string
  m2: { min: number; max: number }
  count: number
  available: number
  sold: number
  priceFrom: number
  /** "Ebeveyn banyolu", "Bahçe dubleks", "Geniş teras" vb. */
  features?: string[]
  /** Opsiyonel mimari plan görseli */
  floorPlan?: string
}

/** İnşaat aşaması içindeki tekil iş adımı (örn. "Zemin Etüdü") */
export interface PhaseStep {
  label: string
  /** Boş dizi → "süreç devam ediyor, görsel henüz yüklenmedi" */
  images: string[]
}

/** Bir inşaat aşamasının (temel, kaba, ...) adımları ve tamamlanma yüzdesi */
export interface PhaseDetail {
  key: ConstructionPhase
  /** 0–100 arası bu aşamanın tamamlanma oranı */
  percent: number
  steps: PhaseStep[]
}

/** Teknik şartname grubu (örn. "Yapısal Sistem") */
export interface TechSpecGroup {
  category: string
  items: { label: string; value: string }[]
}

/** Firma "Hakkında" vitrininde gösterilen geçmiş tamamlanmış proje */
export interface PastProject {
  name: string
  year?: number
  location?: string
  type?: string
  imageUrl?: string
}

export interface Project {
  id: string
  name: string
  contractorId: string
  location: { city: string; district: string }
  type: PropertyType
  priceStart: number
  currency: 'TRY' | 'USD' | 'EUR'
  sqmRange: { min: number; max: number }
  roomTypes: string[]
  totalUnits: number
  soldUnits: number
  completionPercent: number
  phase: ConstructionPhase
  estimatedDelivery: string
  occupancyReady: boolean
  status: ProjectStatus
  rating: number
  imageUrl?: string
  /** Detay sayfası galerisi için ek görseller (imageUrl ile birlikte gösterilir) */
  gallery?: string[]
  /** Oda/villa tipi bazlı bağımsız bölümler */
  unitTypes?: UnitType[]
  /** Aşamalı inşaat galerisi + yüzdelik ilerleme */
  phaseDetails?: PhaseDetail[]
  /** Bina teknik şartnamesi */
  techSpecs?: TechSpecGroup[]
}

export interface Contractor {
  id: string
  name: string
  taxId: string
  rating: number
  projectCount: number
  plan: 'free' | 'pro' | 'enterprise'
  phone?: string
  email?: string
  website?: string
  address?: string
  /** Firma "Hakkında" tanıtım metni */
  about?: string
  /** Kuruluş yılı */
  foundedYear?: number
  /** Merkez şehir */
  city?: string
  /** Uzmanlık alanları, örn. ['Konut', 'Villa', 'Ticari'] */
  specialties?: string[]
  /** Tamamlanmış proje sayısı */
  completedProjects?: number
  /** Firma logosu (public/ altı yol) */
  logoUrl?: string
  /** "Hakkında" bölümünde gösterilen son tamamlanmış 1–2 gerçek proje */
  pastProjects?: PastProject[]
}

export interface DemandEntry {
  id: string
  districts: string[]
  propertyType: PropertyType[]
  roomTypes: string[]
  budgetMin: number
  budgetMax: number
  timeline: '0-3' | '3-6' | '6-12' | '12-24'
  notifications: { email: boolean; sms: boolean; app: boolean }
}

export interface MockUser {
  id: string
  email: string
  password: string
  name: string
  role: 'contractor' | 'buyer'
  contractorId?: string
}
