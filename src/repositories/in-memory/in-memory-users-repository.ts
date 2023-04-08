import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repositories'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.user_id === id)

    if (!user) {
      return null
    } // find retorna underfined

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    } // find retorna underfined

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      user_id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }
    this.items.push(user)

    return user
  }
}
