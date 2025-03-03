import { Skeleton } from './Skeleton';

export const Image = (props) => {
  const { src, alt = '', width = 200, height = 200, className } = props;

  return `
    <div class="image-container">
      ${Skeleton({ width, height })}
      <img
        src="${src}"
        alt="${alt}"
        class="${className}"
        style="display: none;"
        onload="this.style.display = 'block'; this.previousElementSibling.remove();"
      />
    </div>
  `;
};
