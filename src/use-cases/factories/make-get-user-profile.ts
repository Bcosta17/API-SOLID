import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUseProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUserRepository()
  const useCase = new GetUseProfileUseCase(usersRepository)

  return useCase
}
