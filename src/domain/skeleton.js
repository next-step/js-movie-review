import { SkeletonItems } from '../components/SkeletonItems';

export const addSkeleton = () => {
  const movieSection = document.querySelector(".thumbnail-list");
  movieSection.insertAdjacentHTML("beforeend", SkeletonItems());
};

export const removeSkeleton = () => {
  const skeletonLists = document.querySelectorAll(".skeleton-list");
  skeletonLists.forEach((skeletonList) => {
    skeletonList.remove();
  });
};
