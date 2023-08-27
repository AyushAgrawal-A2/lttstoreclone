import { unstable_cache } from "next/cache";
import { getHome } from "../prisma/home";

export default async function cachedGetHome() {
  return await unstable_cache(() => getHome(), ["home"])();
}
