'use server';

import API_ENDPOINT from '../config/api_endpoints';

export default async function fetchProduct(name: string) {
  const path = `${API_ENDPOINT}/products/${name}`;
  return await fetch(path)
    .then((res) => {
      if (res.ok) return res.json();
    })
    .catch(console.log);
}
