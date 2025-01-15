import ky from 'ky';

const prefixUrl = `${process.env.API_URL ? process.env.API_URL : ''}/`;
const apiKey = process.env.API_KEY ?? '';

export const instance = ky.extend({
  headers: {
    Accept: 'application/json',
  },
  prefixUrl,
  searchParams: {
    apiKey,
  },
});
