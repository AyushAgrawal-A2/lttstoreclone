import { Prisma, PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaOptions: Prisma.PrismaClientOptions = {
  log: ['query', 'error', 'warn'],
};

const prisma = globalThis.prisma || new PrismaClient(prismaOptions);

export default prisma;
