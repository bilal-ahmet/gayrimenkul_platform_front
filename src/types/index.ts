export type ProjectStatus = 'live' | 'review' | 'draft' | 'completed'
export type PropertyType = 'daire' | 'villa' | 'dükkan' | 'ofis' | 'rezidans' | 'karma'
export type ConstructionPhase = 'temel' | 'kaba' | 'ince' | 'dis_cephe' | 'peyzaj' | 'teslim'

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
