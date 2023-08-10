let API_ENDPOINT = '';

if (process.env.NODE_ENV === 'development')
  API_ENDPOINT = 'http://localhost:3000/api';
else API_ENDPOINT = 'https://lttstoreclone.vercel.app/api';

export default API_ENDPOINT;
