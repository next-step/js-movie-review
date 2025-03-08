import { SESSION_KEYS } from "../constants";
import { MovieCategory } from "../types/type";

const validCategories: MovieCategory[] = [
  "now_playing",
  "popular",
  "top_rated",
  "upcoming",
];

function getInitialCategory(): MovieCategory {
  const stored = sessionStorage.getItem(SESSION_KEYS.SELECTED_CATEGORY);
  if (stored && validCategories.includes(stored as MovieCategory)) {
    return stored as MovieCategory;
  }
  return "popular";
}

export function Tabs(onTabChange: (selectedCategory: MovieCategory) => void) {
  const tabContainer = document.getElementById("tab-container");

  let selectedCategory: MovieCategory = getInitialCategory();

  function renderTabs(): void {
    if (!tabContainer) {
      return;
    }

    tabContainer.innerHTML = "";
    const ul = document.createElement("ul");
    ul.classList.add("tab");

    const tabItems: { category: MovieCategory; label: string }[] = [
      { category: "now_playing", label: "상영 중" },
      { category: "popular", label: "인기순" },
      { category: "top_rated", label: "평점순" },
      { category: "upcoming", label: "상영 예정" },
    ];
    const tabHTML = `
    <ul class="tab">
      ${tabItems
        .map(
          ({ category, label }) => `
        <li data-category="${category}">
          <a href="#">
            <div class="tab-item">
              <h3>${label}</h3>
            </div>
          </a>
        </li>
      `
        )
        .join("")}
    </ul>
  `;

    tabContainer.innerHTML = tabHTML;
    updateTabSelection();
  }

  function handleTabSelection(e: Event): void {
    e.preventDefault();
    const target = (e.target as HTMLElement).closest("li[data-category]");
    if (!target) return;

    const newSelectedCategory = target.getAttribute("data-category");
    if (
      newSelectedCategory &&
      validCategories.includes(newSelectedCategory as MovieCategory)
    ) {
      selectedCategory = newSelectedCategory as MovieCategory;
      sessionStorage.setItem(SESSION_KEYS.SELECTED_CATEGORY, selectedCategory);
      updateTabSelection();
      onTabChange(selectedCategory);
    }
  }

  function updateTabSelection(): void {
    if (!tabContainer) {
      return;
    }

    tabContainer.querySelectorAll("li[data-category]").forEach((li) => {
      const tabItem = li.querySelector(".tab-item");
      if (tabItem) {
        tabItem.classList.toggle(
          "selected",
          li.getAttribute("data-category") === selectedCategory
        );
      }
    });
  }

  function init(): void {
    if (!tabContainer) {
      return;
    }
    renderTabs();
    tabContainer.addEventListener("click", handleTabSelection);
    onTabChange(selectedCategory);
  }

  return { init, getSelectedCategory: (): MovieCategory => selectedCategory };
}
