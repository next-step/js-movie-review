const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchMovies(page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/popular?language=ko-KR&page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch movies");

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}
