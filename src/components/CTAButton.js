const CTAButton = ({ text }) => {
  const $el = document.createElement('button');
  $el.className = 'btn primary full-width';
  $el.textContent = text;

  return $el;
};

export default CTAButton;
