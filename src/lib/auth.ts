import { mockUsers } from '@/data/mockUsers'
import type { MockUser } from '@/types'

const STORAGE_KEY = 'demo_user'
const REGISTERED_KEY = 'registered_users'

function getRegisteredUsers(): MockUser[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(REGISTERED_KEY) || '[]')
  } catch {
    return []
  }
}

export function register(name: string, email: string, password: string, role: 'buyer' | 'contractor'): MockUser {
  const uid = `u_${Date.now()}`
  const newUser: MockUser = {
    id: uid,
    email,
    password,
    name,
    role,
    ...(role === 'contractor' ? { contractorId: `c_${uid}` } : {}),
  }
  if (typeof window !== 'undefined') {
    const existing = getRegisteredUsers()
    localStorage.setItem(REGISTERED_KEY, JSON.stringify([...existing, newUser]))
  }
  return newUser
}

export function login(email: string, password: string): MockUser | null {
  const allUsers = [...mockUsers, ...getRegisteredUsers()]
  const user = allUsers.find(
    (u) => u.email === email && u.password === password
  )
  if (!user) return null
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  }
  return user
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY)
  }
}

export function getUser(): MockUser | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as MockUser
  } catch {
    return null
  }
}

export function isContractor(): boolean {
  return getUser()?.role === 'contractor'
}
