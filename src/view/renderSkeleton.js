import renderMovieCard from "./renderMovieCard";

export const renderSkeleton = (element) => {
  const inner = Array.from({ length: 12 }).map((item, idx) =>
    renderMovieCard()
  );

  element.append(...inner);
};

export const removeSkeleton = (parentElement) => {
  const skeleton = parentElement.querySelectorAll("li.skeleton");
  skeleton.forEach((element) => {
    parentElement.removeChild(element);
  });
};
