'use server';

import API_ENDPOINT from '../config/api_endpoints';

export default async function fetchBlog(path: string) {
  const blogPath = `${API_ENDPOINT}/blogs/the-newsletter-archive/${path}`;
  return await fetch(blogPath)
    .then((res) => res.json())
    .catch(console.log);
}
