export const Skeleton = (props) => {
  const _width = props?.width ? `${props.width}px` : '100%';
  const _height = props?.height ? `${props.height}px` : '100%';

  return `
    <div 
      class="skeleton" 
      style="width: ${_width}; height: ${_height};">
    </div>
  `;
};
