import type { MockUser } from '@/types'

export const mockUsers: MockUser[] = [
  {
    id: 'u1',
    email: 'contractor@demo.com',
    password: '123456',
    name: 'Ahmet Yılmaz',
    role: 'contractor',
    contractorId: 'c1',
  },
  {
    id: 'u2',
    email: 'buyer@demo.com',
    password: '123456',
    name: 'Ayşe Kaya',
    role: 'buyer',
  },
]
