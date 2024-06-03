import { createAPIRequest } from "../utils/fetch";

const MOVIE_API = {
  POPULAR: "https://api.themoviedb.org/3/movie/popular",
};

export const fetchPopularMovies = async (page = 1) => {
  const request = {
    url: MOVIE_API.POPULAR,
    query: {
      language: "ko-kr",
      page,
    },
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };
  return await createAPIRequest(request);
};
