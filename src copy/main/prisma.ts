import { PrismaClient } from '@prisma/client'

let database: PrismaClient

declare global {
  var prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV === 'production') {
  database = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  database = global.prisma
}

export default database
