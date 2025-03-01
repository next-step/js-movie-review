export const HelperLabel = (props) => {
  const { content } = props;

  return `
    <span style="color: var(--grey-400); font-size: 14px;">${content}</span>
  `;
};
