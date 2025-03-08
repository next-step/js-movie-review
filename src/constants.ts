import { MovieCategory } from "./types/type";

export const MOBILE_BREAKPOINT = 768;
export const MOBILE_MOVIES_PER_LOAD = 3;
export const DESKTOP_MOVIES_PER_LOAD = 9;

export const SESSION_KEYS = {
  SELECTED_CATEGORY: "selectedCategory",
};

export const DEFAULT_CATEGORY = "popular";
export const VALID_CATEGORIES: MovieCategory[] = [
  "now_playing",
  "popular",
  "top_rated",
  "upcoming",
];
export const TAB_ITEMS: { category: MovieCategory; label: string }[] = [
  { category: "now_playing", label: "상영 중" },
  { category: "popular", label: "인기순" },
  { category: "top_rated", label: "평점순" },
  { category: "upcoming", label: "상영 예정" },
];
