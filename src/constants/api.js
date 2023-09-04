import { API_KEY_TMDB_READ_ACCESS_TOKEN } from './env.js';

export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
};

export const FETCH_OPTIONS_HEADERS = {
  accept: 'application/json',
  Authorization: `Bearer ${API_KEY_TMDB_READ_ACCESS_TOKEN}`,
};
