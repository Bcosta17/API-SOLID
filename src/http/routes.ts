import fastify, { FastifyInstance } from 'fastify'
import { register } from './controllers/register'

export const app = fastify()

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}
