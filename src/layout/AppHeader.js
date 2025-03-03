import { state } from "../shared/state";

export const AppHeader = () => {
  const { value: headerState, subscribe } = state(true);

  const handleClick = () => {
    headerState.value = !headerState.value;
  };

  const container = document.createDocumentFragment();
  const header = document.createElement("header");
  header.addEventListener("click", handleClick);
  // header.innerHTML = headerState.value;
  container.appendChild(header);

  const render = () => {
    header.innerHTML = /* html */ `
    <div class="background-container">
      <div class="overlay" aria-hidden="true"></div>
      <div class="top-rated-container">
        <h1 class="logo">
          <img src="../../images/logo.png" alt="MovieList" />
        </h1>
        <div class="top-rated-movie">
          <div class="rate">
            <img src="../../templates/images/star_empty.png" class="star" />
            <span class="rate-value">9.5</span>
          </div>
          <div class="title">인사이드 아웃2</div>
          <button class="primary detail">자세히 보기</button>
        </div>
      </div>
    </div>
    `;
  };

  // 초기 렌더
  render();

  // value내 값이 변할 떄, render를 다시!
  subscribe(() => {
    // console.log(`🔔 Observer 패턴: ${key} 변경됨 -> ${value}`);
    render();
  });

  return container;
};
