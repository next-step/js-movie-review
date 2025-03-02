export function createTabs() {
  const tabContainer = document.getElementById("tab-container");
  if (!tabContainer) return;

  let selectedTab = sessionStorage.getItem("selectedTab") || "now_playing";

  function renderTabs() {
    tabContainer.innerHTML = `
    <ul class="tab">
      <li data-category="now_playing"><a href="#"><div class="tab-item selected"><h3>상영 중</h3></div></a></li>
      <li data-category="popular"><a href="#"><div class="tab-item"><h3>인기순</h3></div></a></li>
      <li data-category="top_rated"><a href="#"><div class="tab-item"><h3>평점순</h3></div></a></li>
      <li data-category="upcoming"><a href="#"><div class="tab-item"><h3>상영 예정</h3></div></a></li>
    </ul>
  `;
  }

  function handleTabClick(e) {
    e.preventDefault();
    const target = e.target.closest("li[data-category]");
    if (!target) return;

    selectedTab = target.getAttribute("data-category");

    tabContainer
      .querySelectorAll(".tab-item.selected")
      .forEach((el) => el.classList.remove("selected"));
    target.querySelector(".tab-item").classList.add("selected");

    sessionStorage.setItem("selectedTab", selectedTab);
  }

  function init() {
    renderTabs();
    tabContainer.addEventListener("click", handleTabClick);
  }

  return { init, getSelectedTab: () => selectedTab };
}
