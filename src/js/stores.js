import APIStore from './core/APIStore.js';

const movieStore = APIStore.createStore([], 'movies');

export { movieStore };
