import type { Project, PropertyType } from '@/types'
import { projects as staticProjects } from '@/data/projects'

const KEY = 'contractor_projects'

export function getLocalProjects(): Project[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function getAllProjects(): Project[] {
  return [...staticProjects, ...getLocalProjects()]
}

export function getContractorProjects(contractorId: string): Project[] {
  return getAllProjects().filter((p) => p.contractorId === contractorId)
}

export function saveProject(fields: {
  name: string
  city: string
  district: string
  type: string
  priceStart: string
  completion: string
  delivery: string
}, contractorId: string): Project {
  const project: Project = {
    id: `local_${Date.now()}`,
    name: fields.name,
    contractorId,
    location: { city: fields.city, district: fields.district },
    type: fields.type as PropertyType,
    priceStart: Number(fields.priceStart) || 0,
    currency: 'TRY',
    sqmRange: { min: 0, max: 0 },
    roomTypes: [],
    totalUnits: 0,
    soldUnits: 0,
    completionPercent: Number(fields.completion) || 0,
    phase: 'temel',
    estimatedDelivery: fields.delivery,
    occupancyReady: false,
    status: 'review',
    rating: 0,
  }
  const existing = getLocalProjects()
  localStorage.setItem(KEY, JSON.stringify([...existing, project]))
  return project
}
