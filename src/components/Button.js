const BUTTON_SIZES = {
  lg: 44,
  md: 36,
  sm: 30,
};

const BUTTON_VARIANTS = {
  primary: {
    border: 'none',
    background: 'var(--primary-color)',
    color: 'var(--grey-100)',
  },
  outlined: {
    border: '1px solid var(--grey-300)',
    background: 'transparent',
    color: 'var(--grey-300)',
  },
};

export const Button = (props) => {
  const { name, size = 'md', content, variant = 'primary' } = props;

  const _size = BUTTON_SIZES[size];
  const { border, background, color } = BUTTON_VARIANTS[variant];

  return `
    <button
      id="${name}"
      style="
        width: 100%;
        height: ${_size}px;
        border: ${border};
        background: ${background};
        color: ${color};
        border-radius: 8px;
        pointer: cursor;
      "
    >
      ${content}
    </button>
  `;
};
