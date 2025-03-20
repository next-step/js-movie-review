import { STORAGE_KEYS } from "../constants";
import { UserRating } from "../types/type";
import { getStoredData, setStoredData } from "../utils/storage";

export const getUserRating = (movieId: number): UserRating | null => {
  const storedRatings = getStoredData<UserRating>(STORAGE_KEYS.USER_RATINGS);

  return storedRatings[movieId] || null;
};

export const setUserRating = (movieId: number, score: number): void => {
  const newRating: UserRating = {
    movieId,
    score,
    ratedAt: new Date().toISOString(),
  };

  setStoredData<UserRating>(STORAGE_KEYS.USER_RATINGS, movieId, newRating);
};
