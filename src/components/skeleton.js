export const createSkeletonItem = () => {
  const list = document.createElement("li");
  list.classList.add("skeleton-item");

  const thumbnail = document.createElement("div");
  thumbnail.classList.add("skeleton-thumbnail");

  list.appendChild(thumbnail);

  return list;
};

export const createSkeleton = (count = 20) => {
  const fragment = document.createDocumentFragment();
  fragment.append(...Array.from({ length: count }, createSkeletonItem));
  return fragment;
};

export const removeSkeleton = () => {
  document.querySelectorAll(".skeleton-item").forEach((item) => item.remove());
};
