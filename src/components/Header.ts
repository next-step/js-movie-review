interface HeaderMovieParams {
  title: string;
  rating: string;
  backdrop: string;
}

export function Header() {
  const headerContainer = document.getElementById("header-container");
  if (!headerContainer) {
    return null;
  }

  const template = document.getElementById(
    "header-template"
  ) as HTMLTemplateElement | null;
  if (!template) {
    return null;
  }

  function render(): void {
    if (!headerContainer || !template) {
      return;
    }

    const headerElement = template.content.cloneNode(true);
    headerContainer.innerHTML = "";
    headerContainer.appendChild(headerElement);
  }

  function update({ title, rating, backdrop }: HeaderMovieParams): void {
    if (!headerContainer) {
      return;
    }

    const headerEl = headerContainer.querySelector(
      "header"
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
    const titleEl = topRatedMovieEl.querySelector(
      ".title"
    ) as HTMLElement | null;
    if (titleEl) {
      titleEl.textContent = title;
    }
  }

  return { render, update };
}
