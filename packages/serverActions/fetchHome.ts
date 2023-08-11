'use server';

import API_ENDPOINT from '../config/api_endpoints';

export default async function fetchHome() {
  const path = API_ENDPOINT + '/home';
  return await fetch(path)
    .then((res) => {
      if (res.ok) return res.json();
    })
    .catch(console.log);
}
