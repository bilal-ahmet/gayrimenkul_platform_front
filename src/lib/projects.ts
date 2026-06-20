import type { Project, PropertyType, ConstructionPhase } from '@/types'
import { projects as staticProjects } from '@/data/projects'

const KEY          = 'contractor_projects'
const OVERRIDES_KEY = 'project_overrides'

// ── Okuma ─────────────────────────────────────────────────────────────────────

export function getLocalProjects(): Project[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}

function getOverrides(): Record<string, Partial<Project>> {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem(OVERRIDES_KEY) || '{}') } catch { return {} }
}

/** Statik + lokal projeler; lokal override'lar üstünde uygulanır. */
export function getAllProjects(): Project[] {
  const overrides = getOverrides()
  return [...staticProjects, ...getLocalProjects()].map(p => ({
    ...p,
    ...(overrides[p.id] ?? {}),
  }))
}

export function getContractorProjects(contractorId: string): Project[] {
  return getAllProjects().filter(p => p.contractorId === contractorId)
}

// ── Yazma ─────────────────────────────────────────────────────────────────────

export function saveProject(fields: {
  name: string
  city: string
  district: string
  type: string
  priceStart: string
  currency: 'TRY' | 'USD' | 'EUR'
  sqmMin: string
  sqmMax: string
  roomTypes: string[]
  totalUnits: string
  soldUnits: string
  phase: ConstructionPhase | ''
  completion: string
  delivery: string
  occupancyReady: boolean
}, contractorId: string): Project {
  const project: Project = {
    id: `local_${Date.now()}`,
    name: fields.name,
    contractorId,
    location: { city: fields.city, district: fields.district },
    type: fields.type as PropertyType,
    priceStart: Number(fields.priceStart) || 0,
    currency: fields.currency || 'TRY',
    sqmRange: { min: Number(fields.sqmMin) || 0, max: Number(fields.sqmMax) || 0 },
    roomTypes: fields.roomTypes,
    totalUnits: Number(fields.totalUnits) || 0,
    soldUnits: Number(fields.soldUnits) || 0,
    completionPercent: Number(fields.completion) || 0,
    phase: (fields.phase || 'temel') as ConstructionPhase,
    estimatedDelivery: fields.delivery,
    occupancyReady: fields.occupancyReady,
    status: 'review',
    rating: 0,
  }
  const existing = getLocalProjects()
  localStorage.setItem(KEY, JSON.stringify([...existing, project]))
  return project
}

/** Herhangi bir projeyi (statik veya lokal) günceller — localStorage override olarak saklanır. */
export function updateProject(id: string, updates: Partial<Project>): void {
  const overrides = getOverrides()
  overrides[id] = { ...(overrides[id] ?? {}), ...updates }
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides))
}
