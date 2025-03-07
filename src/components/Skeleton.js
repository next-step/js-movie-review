export const Skeleton = (props) => {
  const { width, height } = props;

  const _width = width ? `${width}px` : '100%';
  const _height = height ? `${height}px` : '100%';

  return `
    <div 
      class="skeleton" 
      style="width: ${_width}; height: ${_height};">
    </div>
  `;
};
