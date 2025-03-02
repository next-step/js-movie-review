export function createTabs(onTabChange = null) {
  const tabContainer = document.getElementById("tab-container");
  if (!tabContainer) {
    console.error("탭 컨테이너가 없습니다.");
    return;
  }

  let selectedTab = sessionStorage.getItem("selectedTab") || "popular";

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

  function handleTabClick(e) {
    e.preventDefault();
    const target = e.target.closest("li[data-category]");
    if (!target) return;

    selectedTab = target.getAttribute("data-category");
    sessionStorage.setItem("selectedTab", selectedTab);
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
    tabContainer.addEventListener("click", handleTabClick);

    if (onTabChange) {
      onTabChange(selectedTab);
    }
  }

  return { init, getSelectedTab: () => selectedTab };
}
