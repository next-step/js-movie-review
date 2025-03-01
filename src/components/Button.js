const BUTTON_SIZES = {
  lg: 44,
  md: 36,
  sm: 30,
};

export const Button = (props) => {
  const {
    name,
    size = 'md',
    content,
    variant = 'primary',
    fullWidth = false,
  } = props;

  const _size = BUTTON_SIZES[size];
  const width = fullWidth ? '100%' : 'fit-content';

  return `
    <button
      id="${name}"
      class="${variant}"
      style="
        width: ${width};
        height: ${_size}px;
      "
    >
      ${content}
    </button>
  `;
};
