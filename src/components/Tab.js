import { SESSION_KEYS } from "../constants";

export function createTabs(onTabChange = null) {
  const tabContainer = document.getElementById("tab-container");
  if (!tabContainer) {
    console.error("document에서 tab-container id를 찾을 수 없습니다.");
    return;
  }

  let selectedTab =
    sessionStorage.getItem(SESSION_KEYS.SELECTED_TAB) || "popular";

  function renderTabs() {
    tabContainer.innerHTML = "";
    const ul = document.createElement("ul");
    ul.classList.add("tab");

    const tabItems = [
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
    updateSelectedTab();
  }

  function handleTabSelection(e) {
    e.preventDefault();
    const target = e.target.closest("li[data-category]");
    if (!target) return;

    selectedTab = target.getAttribute("data-category");
    sessionStorage.setItem(SESSION_KEYS.SELECTED_TAB, selectedTab);
    updateSelectedTab();

    if (onTabChange) {
      onTabChange(selectedTab);
    }
  }

  function updateSelectedTab() {
    tabContainer.querySelectorAll("li[data-category]").forEach((li) => {
      const tabItem = li.querySelector(".tab-item");
      tabItem.classList.toggle("selected", li.dataset.category === selectedTab);
    });
  }

  function init() {
    renderTabs();
    tabContainer.addEventListener("click", handleTabSelection);

    if (onTabChange) {
      onTabChange(selectedTab);
    }
  }

  return { init, getSelectedTab: () => selectedTab };
}
