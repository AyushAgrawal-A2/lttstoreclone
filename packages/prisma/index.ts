import { Prisma, PrismaClient } from '@prisma/client';

const prismaOptions: Prisma.PrismaClientOptions = {
  log: ['query', 'error', 'warn'],
};
const prisma = new PrismaClient(prismaOptions);

export default prisma;
