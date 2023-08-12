'use server';

import { getHome } from '../prisma/home';

export default async function fetchHome() {
  return await getHome();
}
