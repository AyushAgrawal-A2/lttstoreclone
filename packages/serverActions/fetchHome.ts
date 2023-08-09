'use server';

import { cache } from 'react';
import { getHome } from '../prisma/home';

const fetchHome = cache(async () => await getHome());

export default fetchHome;
