export function LoadHeader({
  title = "기본 제목",
  rating = "0.0",
  backdrop = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg",
}) {
  const headerContainer = document.getElementById("header-container");
  if (!headerContainer) {
    console.error("document에서 header-container id를 찾을 수 없습니다.");
    return;
  }

  const template = document.getElementById("header-template");
  if (!template) {
    console.error("document에서 header-template id를 찾을 수 없습니다.");
    return;
  }

  const headerElement = template.content.cloneNode(true);

  headerElement.querySelector(
    "header"
  ).style.backgroundImage = `url('${backdrop}')`;
  headerElement.querySelector(".rate-value").textContent = rating;
  headerElement.querySelector(".title").textContent = title;

  headerContainer.innerHTML = "";
  headerContainer.appendChild(headerElement);
}
