'use server';

import API_ENDPOINT from '../config/api_endpoints';

export default async function fetchProduct(path: string) {
  const productPath = `${API_ENDPOINT}/products/${path}`;
  return await fetch(productPath)
    .then((res) => {
      if (res.ok) return res.json();
    })
    .catch(console.log);
}
