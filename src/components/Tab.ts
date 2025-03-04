import { Category } from "../types/type";

const validCategories: Category[] = [
  "now_playing",
  "popular",
  "top_rated",
  "upcoming",
];

function getInitialCategory(): Category {
  const stored = sessionStorage.getItem("selectedCategory");
  if (stored && validCategories.includes(stored as Category)) {
    return stored as Category;
  }
  return "popular";
}

export function createTabs(onTabChange: (selectedCategory: Category) => void) {
  const container = document.getElementById("tab-container");
  if (!container) {
    throw new Error("탭 컨테이너가 없습니다.");
  }
  const tabContainer: HTMLElement = container;

  let selectedCategory: Category = getInitialCategory();

  function renderTabs(): void {
    tabContainer.innerHTML = "";
    const ul = document.createElement("ul");
    ul.classList.add("tab");

    const tabItems: { category: Category; label: string }[] = [
      { category: "now_playing", label: "상영 중" },
      { category: "popular", label: "인기순" },
      { category: "top_rated", label: "평점순" },
      { category: "upcoming", label: "상영 예정" },
    ];

    tabItems.forEach(({ category, label }) => {
      const li = document.createElement("li");
      li.setAttribute("data-category", category);
      const a = document.createElement("a");
      a.href = "#";
      const div = document.createElement("div");
      div.classList.add("tab-item");
      div.innerHTML = `<h3>${label}</h3>`;
      a.appendChild(div);
      li.appendChild(a);
      ul.appendChild(li);
    });

    tabContainer.appendChild(ul);
    updateSelectedTab();
  }

  function handleTabClick(e: Event): void {
    e.preventDefault();
    const target = (e.target as HTMLElement).closest("li[data-category]");
    if (!target) return;

    const newSelectedCategory = target.getAttribute("data-category");
    if (
      newSelectedCategory &&
      validCategories.includes(newSelectedCategory as Category)
    ) {
      selectedCategory = newSelectedCategory as Category;
      sessionStorage.setItem("selectedCategory", selectedCategory);
      updateSelectedTab();
      onTabChange(selectedCategory);
    }
  }

  function updateSelectedTab(): void {
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
    renderTabs();
    tabContainer.addEventListener("click", handleTabClick);
    onTabChange(selectedCategory);
  }

  return { init, getSelectedCategory: (): Category => selectedCategory };
}
