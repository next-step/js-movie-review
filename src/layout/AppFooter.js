export const AppFooter = () => {
  const container = document.createDocumentFragment();
  const footer = document.createElement("headefooterr");
  // header.innerHTML = headerState.value;
  container.appendChild(footer);

  const render = () => {
    // header.innerHTML = headerState.value;
    footer.innerHTML = /* html */ ` <footer class="footer">
    <p>&copy; 우아한테크코스 All Rights Reserved.</p>
    <p><img src="./images/woowacourse_logo.png" width="180" /></p>
  </footer>`;
  };

  // 초기 렌더
  render();

  return container;
};
