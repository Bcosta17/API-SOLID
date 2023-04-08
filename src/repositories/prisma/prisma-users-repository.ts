import { prisma } from '../../src/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repositories'

export class PrismaUserRepository implements UsersRepository {
  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}