import MovieListModel from "../domain/MovieListModel.js";
import { movieApiKey } from "./MovieApiInfomation.js";

export async function getMovie(movieApiQuery) {
  const apiUrl = `${movieApiQuery.apiUrl}?${movieApiQuery.toQueryString()}`;
  console.log(apiUrl);
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + movieApiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return new MovieListModel(await response.json());
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
// https://api.themoviedb.org/3/search/keyword?page=1
