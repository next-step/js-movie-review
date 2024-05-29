const Content = () => {
  const $el = document.createElement('main');

  $el.insertAdjacentHTML(
    `afterbegin`,
    `
      <section class="item-view">
        <h2>지금 인기 있는 영화</h2>
        <ul class="item-list"></ul>
      </section>
  `
  );

  return $el;
};

export default Content;
