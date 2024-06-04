export async function fetchMovies({ page }) {
  const baseUrl = "https://api.themoviedb.org/3/movie/popular";
  const param = new URLSearchParams({
    page,
    language: "ko-KR",
  });

  const response = await fetch(`${baseUrl}?${param}`, {
    headers: { authorization: `Bearer ${process.env.API_KEY}` },
  });

  return await response.json();
}
