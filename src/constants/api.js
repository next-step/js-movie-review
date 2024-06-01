import { LANGUAGE } from "./option";

const END_POINT = {
  POPULAR_MOVIES: (page, language = LANGUAGE.KOREAN) => `/popular?language=${language}&page=${page}`,
};

export default END_POINT;
