export function loadTabs() {
  const tabContainer = document.getElementById("tab-container");
  if (!tabContainer) return;

  tabContainer.innerHTML = `
    <ul class="tab">
      <li data-category="now_playing"><a href="#"><div class="tab-item selected"><h3>상영 중</h3></div></a></li>
      <li data-category="popular"><a href="#"><div class="tab-item"><h3>인기순</h3></div></a></li>
      <li data-category="top_rated"><a href="#"><div class="tab-item"><h3>평점순</h3></div></a></li>
      <li data-category="upcoming"><a href="#"><div class="tab-item"><h3>상영 예정</h3></div></a></li>
    </ul>
  `;

  document.getElementById("tab-container").addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.target.closest("li[data-category]");
    if (!target) return;

    document
      .querySelectorAll(".tab-item.selected")
      .forEach((el) => el.classList.remove("selected"));
    target.querySelector(".tab-item").classList.add("selected");

    const tabType = target.getAttribute("data-tab");
    console.log(tabType);
  });
}
