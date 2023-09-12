const renderSkeleton = () => {
  return ` 
      <li class="skeleton-container">
        <a href="#">
          <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="item-score skeleton"></div>
          </div>
        </a>
      </li>
     `;
};

const SkeletonUI = num =>
  Array.from({ length: num }, () => renderSkeleton()).join("");

export { SkeletonUI };
