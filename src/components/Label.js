export const Label = (props) => {
  const { name, content, required = false } = props;

  return `
    <div style="display: flex; gap: 4px;">
      <label for="${name}" style="color: var(--grey-400); font-size: 14px;">${content}</label>
      ${required ? '<span style="color: var(--primary-color);">*</span>' : ''}
    </div>
  `;
};
