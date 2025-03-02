export class Tabs {
  constructor(containerId = "tab-container", onTabChange) {
    this.tabContainer = document.getElementById(containerId);
    if (!this.tabContainer) {
      throw new Error("탭 컨테이너가 없습니다.");
    }

    this.selectedTab = sessionStorage.getItem("selectedTab") || "now_playing";
    this.onTabChange = onTabChange;
    this.handleTabClick = this.handleTabClick.bind(this); // 이벤트 핸들러 바인딩
  }

  renderTabs() {
    this.tabContainer.innerHTML = "";
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

    this.tabContainer.appendChild(ul);
    this.updateSelectedTab();
  }

  handleTabClick(e) {
    e.preventDefault();
    const target = e.target.closest("li[data-category]");
    if (!target) return;

    this.selectedTab = target.getAttribute("data-category");
    sessionStorage.setItem("selectedTab", this.selectedTab);
    this.updateSelectedTab();

    if (this.onTabChange) {
      this.onTabChange(this.selectedTab);
    }
  }

  updateSelectedTab() {
    this.tabContainer.querySelectorAll("li[data-category]").forEach((li) => {
      const tabItem = li.querySelector(".tab-item");
      tabItem.classList.toggle(
        "selected",
        li.dataset.category === this.selectedTab
      );
    });
  }

  init() {
    this.renderTabs();
    this.tabContainer.addEventListener("click", this.handleTabClick);

    if (this.onTabChange) {
      this.onTabChange(this.selectedTab);
    }
  }
}
