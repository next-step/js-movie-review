export const createHeader = ({ title, rate, onclick = () => {} }) => {
  const header = document.createElement("header");

  header.innerHTML = /*html*/ `
    <div class="background-container">
    <div class="overlay" aria-hidden="true"></div>
    <div class="top-rated-container">
      <h1 class="logo">
        <img src="./images/logo.png" alt="MovieList" />
      </h1>
      <div class="top-rated-movie">
        <div class="rate">
          <img src="./images/star_empty.png" class="star" />
          <span class="rate-value">${rate}</span>
        </div>
        <div class="title">${title}</div>
          <button class="primary detail">자세히 보기</button>
        </div>
      </div>
    </div>
  `;

  header.querySelector("button.detail").addEventListener("click", onclick);

  return header;
};
