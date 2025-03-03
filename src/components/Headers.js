export function LoadBaseHeader() {
  const headerContainer = document.getElementById("header-container");
  if (!headerContainer) return;

  const template = document.getElementById("header-template");
  if (!template) return;

  const headerElement = template.content.cloneNode(true);

  headerContainer.innerHTML = "";
  headerContainer.appendChild(headerElement);
}

export function updateHeaderMovie({ title, rating, backdrop }) {
  const headerEl = document.querySelector("#header-container header");
  if (!headerEl) return;

  headerEl.style.backgroundImage = `url('${backdrop}')`;

  const topRatedMovieEl = headerEl.querySelector(".top-rated-movie");
  if (!topRatedMovieEl) return;
  topRatedMovieEl.style.display = "block";

  const rateValueEl = topRatedMovieEl.querySelector(".rate-value");
  if (rateValueEl) {
    rateValueEl.textContent = rating;
  }
  const titleEl = topRatedMovieEl.querySelector(".title");
  if (titleEl) {
    titleEl.textContent = title;
  }
}
