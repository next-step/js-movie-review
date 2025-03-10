import MovieListModel from "../domain/MovieListModel.js";

const BASE_URL = "https://api.themoviedb.org/3/discover/movie";
const API_KEY = import.meta.env.API_KEY;

export async function movieApiCall(movieApiQuery) {
  const apiUrl = `${BASE_URL}?${movieApiQuery.toQueryString()}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + API_KEY,
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
