import prisma from ".";

export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  return await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  });
}

export async function getUser(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}
