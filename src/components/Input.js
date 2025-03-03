import { HelperLabel } from './HelperLabel';
import { Label } from './Label';

export const Input = (props) => {
  const { name, label, placeholder, helperText, required, value, fullWidth } =
    props;

  const _width = fullWidth ? 'width: 100%; flex: 1;' : '';
  const _placeholder = placeholder ? `placeholder="${placeholder}"` : '';
  const _value = value ? `value="${value}"` : '';

  return `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      ${label ? Label({ name, content: label, required }) : ''}
      <input
        id=${name}
        name=${name}
        style="${_width} height: 44px; padding: 8px; border: 1px solid var(--color-white); color: var(--color-white); border-radius: 8px; font-size: 16px; background-color: var(--color-bluegray-100);"
        ${_placeholder}
        ${_value}
      />
      ${helperText ? HelperLabel({ content: helperText }) : ''}
    </div>
  `;
};
