import { Gym, Prisma } from '@prisma/client'

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: Number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
