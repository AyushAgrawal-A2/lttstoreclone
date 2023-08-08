import { Prisma, PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// const prismaOptions: Prisma.PrismaClientOptions = {
//   log: ['query', 'error', 'warn'],
// };

// const prisma = globalThis.prisma || new PrismaClient(prismaOptions);

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
