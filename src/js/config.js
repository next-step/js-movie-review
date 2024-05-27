import dotenv from "dotenv";

const { parsed } = dotenv.config();

export const ENV = {
  TMDB_API_KEY: parsed.TMDB_API_KEY,
};
