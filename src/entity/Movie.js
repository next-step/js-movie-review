import { toElement } from "../shared/ui";

export const Movie = ({ id, title, posterPath, voteAverage }) => {

  const render = () => {
    const container = toElement(`<li>
              <div class="item" id=${id}>
                <img
                  class="thumbnail"
                  src="
https://media.themoviedb.org/t/p/w440_and_h660_face${posterPath}"
                  alt="인사이드 아웃 2"
                />
                <div class="item-desc">
                  <p class="rate">
                    <img src="star_empty.png" class="star" />
                    <span>${voteAverage}</span>
                  </p>
                  <strong>${title}</strong>
                </div>
              </div>
            </li>`)
          
      return container;
  }

  let rootContainer = render()

  return rootContainer;
}