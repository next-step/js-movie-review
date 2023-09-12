const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3/movie";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
};

/**
 * @param {string} endpoint
 */
const requestAPI = async endpoint => {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }

    return data;
  } catch (error) {
    console.error(`Error : ${error}`);
  }
};

export { requestAPI };
