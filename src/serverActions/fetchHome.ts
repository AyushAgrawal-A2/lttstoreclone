"use server";

import { unstable_cache } from "next/cache";
import { getHome } from "@/src/prisma/home";

export default async function fetchHome() {
  return await unstable_cache(() => getHome(), ["home"])();
}
