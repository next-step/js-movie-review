export const SkeletonItems = (count = 4) => {
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
