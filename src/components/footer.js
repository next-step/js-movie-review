export async function loadFooter() {
  const footerContainer = document.getElementById("footer-container");
  if (!footerContainer) return;

  footerContainer.innerHTML = `
  <footer class="footer">
    <p>&copy; 우아한테크코스 All Rights Reserved.</p>
    <p><img src="./images/woowacourse_logo.png" width="180" /></p>
  </footer>
  `;
}
