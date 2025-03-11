export const SkeletonItems = (count = 5) => {
  return Array.from(
    { length: count },
    () => `
      <li class="skeleton-list">
          <div class="skeleton-item">
              <img class="skeleton-thumbnail" />
              <div class="skeleton-item-desc">
                  <p class="skeleton-rate">
                      <img class="skeleton-star" />
                      <span class="skeleton-rate-value"></span>
                  </p>
                  <div class="skeleton-title"></div>
              </div>
          </div>
      </li>
    `,
  ).join("");
};

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