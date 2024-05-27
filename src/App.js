import star_filled from "../templates/star_filled.png";
import header from "./component/Header";
import movieContainer from "./component/MovieContainer";
import movieCardList from "./component/MoiveCardList";
import movieCardListRefetch from "./component/MovieCardListRefetch";
import footer from "./component/Footer";

const render = {
  app: () => {
    const app = document.createElement("div");

    app.innerHTML = `
      <header>
        <h1><img src="./src/assets/logo.png" alt="MovieList 로고" /></h1>
        <div class="search-box">
          <input type="text" placeholder="검색" />
          <button class="search-button">검색</button>
        </div>
      </header>
      <main>
        <section class="item-view">
          <h2>지금 인기 있는 영화</h2>
          <ul class="item-list">
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" /> 6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="${star_filled}" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
          </ul>
          <button class="btn primary full-width">더 보기</button>
        </section>
      </main>
    `;

    document.body.appendChild(app);
  },
  header: ({ selector }) => {
    const seletcedDom = document.querySelector(selector);
    if (!seletcedDom) {
      throw new Error("header dom not found");
    }

    seletcedDom.appendChild(header().dom);
  },
  movieContainer: ({ selector }) => {
    const seletcedDom = document.querySelector(selector);
    if (!seletcedDom) {
      throw new Error("movieContainer dom not found");
    }

    seletcedDom.appendChild(movieContainer().dom);
  },
  movieCardList: ({ selector, cardDatas }) => {
    const seletcedDom = document.querySelector(selector);
    if (!seletcedDom) {
      throw new Error("movieContainer dom not found");
    }

    seletcedDom.appendChild(movieCardList({ cardDatas }).dom);
  },
  movieCardListRefetch: ({ selector, cardDatas }) => {
    const seletcedDom = document.querySelector(selector);
    if (!seletcedDom) {
      throw new Error("movieContainer dom not found");
    }

    movieCardListRefetch({ cardDatas });
  },
  footer: ({ selector, onClick }) => {
    const seletcedDom = document.querySelector(selector);
    if (!seletcedDom) {
      throw new Error("footer dom not found");
    }

    seletcedDom.appendChild(footer({ onClick }).dom);
  },
};

export default render;
