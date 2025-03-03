export const ThumbnailList = ({ mainState }) => {
  const container = document.createDocumentFragment();
  const div = document.createElement("div");
  container.appendChild(div);

  const render = () => {
    div.innerHTML = /* html */ `<ul class="thumbnail-list">
        ${mainState.value
          ?.map((result) => {
            const { title, poster_path: posterPath } = result;
            return /* html */ `<li>
              <div class="item">
                <img
                  class="thumbnail"
                  src="
https://media.themoviedb.org/t/p/w440_and_h660_face${posterPath}"
                  alt="인사이드 아웃 2"
                />
                <div class="item-desc">
                  <p class="rate">
                    <img src="star_empty.png" class="star" />
                    <span>7.7</span>
                  </p>
                  <strong>${title}</strong>
                </div>
              </div>
            </li>`;
          })
          .join("")}
      </ul>`;
  };

  render();

  return container.querySelector("div").innerHTML;
};
