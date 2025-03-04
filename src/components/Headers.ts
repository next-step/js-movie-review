export function LoadBaseHeader(): void {
  const headerContainer = document.getElementById("header-container");
  if (!headerContainer) return;

  const template = document.getElementById(
    "header-template"
  ) as HTMLTemplateElement | null;
  if (!template) return;

  const headerElement = template.content.cloneNode(true);

  headerContainer.innerHTML = "";
  headerContainer.appendChild(headerElement);
}

interface HeaderMovieParams {
  title: string;
  rating: string;
  backdrop: string;
}

export function updateHeaderMovie({
  title,
  rating,
  backdrop,
}: HeaderMovieParams): void {
  const headerEl = document.querySelector(
    "#header-container header"
  ) as HTMLElement | null;
  if (!headerEl) return;

  headerEl.style.backgroundImage = `url('${backdrop}')`;

  const topRatedMovieEl = headerEl.querySelector(
    ".top-rated-movie"
  ) as HTMLElement | null;
  if (!topRatedMovieEl) return;
  topRatedMovieEl.style.display = "block";

  const rateValueEl = topRatedMovieEl.querySelector(
    ".rate-value"
  ) as HTMLElement | null;
  if (rateValueEl) {
    rateValueEl.textContent = rating;
  }
  const titleEl = topRatedMovieEl.querySelector(".title") as HTMLElement | null;
  if (titleEl) {
    titleEl.textContent = title;
  }
}
