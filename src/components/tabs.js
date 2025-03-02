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

  document.querySelectorAll(".tab-item").forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      document
        .querySelector(".tab-item.selected")
        ?.classList.remove("selected");
      tab.classList.add("selected");

      // const category = tab.closest("li").dataset.category;
      // loadMoviesByCategory(category);
    });
  });
}
