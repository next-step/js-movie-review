import {
  DEFAULT_CATEGORY,
  SESSION_KEYS,
  TAB_ITEMS,
  VALID_CATEGORIES,
} from "../constants";
import { MovieCategory } from "../types/type";

const getInitialCategory = (): MovieCategory => {
  const stored = sessionStorage.getItem(SESSION_KEYS.SELECTED_CATEGORY);
  return stored && VALID_CATEGORIES.includes(stored as MovieCategory)
    ? (stored as MovieCategory)
    : DEFAULT_CATEGORY;
};

export const Tabs = (
  onTabChange: (selectedCategory: MovieCategory) => void
) => {
  const tabContainer = document.getElementById("tab-container");
  let selectedCategory: MovieCategory = getInitialCategory();

  const renderTabs = (): void => {
    if (!tabContainer) return;

    tabContainer.innerHTML = `
      <ul class="tab">
        ${TAB_ITEMS.map(
          ({ category, label }) => `
          <li data-category="${category}">
            <a href="#">
              <div class="tab-item">
                <h3>${label}</h3>
              </div>
            </a>
          </li>
        `
        ).join("")}
      </ul>
    `;

    updateTabSelection();
  };

  const handleTabSelection = (e: Event): void => {
    e.preventDefault();
    const target = (e.target as HTMLElement).closest("li[data-category]");
    if (!target) return;

    const newSelectedCategory = target.getAttribute("data-category");
    if (
      newSelectedCategory &&
      VALID_CATEGORIES.includes(newSelectedCategory as MovieCategory)
    ) {
      selectedCategory = newSelectedCategory as MovieCategory;
      sessionStorage.setItem(SESSION_KEYS.SELECTED_CATEGORY, selectedCategory);
      updateTabSelection();
      onTabChange(selectedCategory);
    }
  };

  const updateTabSelection = (): void => {
    if (!tabContainer) return;

    tabContainer.querySelectorAll("li[data-category]").forEach((li) => {
      const tabItem = li.querySelector(".tab-item");
      if (tabItem) {
        tabItem.classList.toggle(
          "selected",
          li.getAttribute("data-category") === selectedCategory
        );
      }
    });
  };

  const init = (): void => {
    if (!tabContainer) return;
    renderTabs();
    tabContainer.addEventListener("click", handleTabSelection);
    onTabChange(selectedCategory);
  };

  return { init, getSelectedCategory: (): MovieCategory => selectedCategory };
};
