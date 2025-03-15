import MovieListModel from "../domain/MovieListModel.js";
import { movieApiUrl, movieApiKey } from "./MovieApiInfomation.js";

export async function getMovie(movieApiQuery) {
  const apiUrl = `${movieApiUrl}?${movieApiQuery.toQueryString()}`;
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
