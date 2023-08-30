import { QueryStore } from './core/index.js';
import MOVIE_LIST from './constants/movie-list-config.js';

export const movieStore = QueryStore.createStore([], MOVIE_LIST.POPULAR.KEY);
