import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'
import { prisma } from '@/lib/prisma'

// "postgresql://docker:docker@localhost:5432/apisolid?schema=public"
// gera um bd único para cada teste
function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL) // classe global do node, utilizada para fazer manipulação de URLs.
  url.searchParams.set('schema', schema) // substitui o schema public para um novo

  return url.toString() // retorna a nova url
}

export default <Environment>{
  name: 'prisma',

  // executado antes de cada teste
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL
    // executa os cmd no terminal
    execSync('npx prisma migrate deploy') // usar o deploy em vez do dev para pula a etapa de comparar o schema local com bd buscando alterações.
    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        ) // apaga os bd

        await prisma.$disconnect()
      }, //  após cada teste
    }
  },
}
