'use server';

import { cache } from 'react';
import { getProduct } from '../prisma/products';

const fetchProduct = cache(async (path: string) => await getProduct(path));

export default fetchProduct;
