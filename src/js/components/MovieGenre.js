import { $createElement } from "../utils/dom";

export const MovieGenre = title => {
  if (!title) return;

  return $createElement("h2", title);
};
