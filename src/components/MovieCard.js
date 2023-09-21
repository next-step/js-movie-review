export class MovieCard {
  #card;

  constructor(movieData) {
    this.#card = this.#createCard(movieData);
  }

  #createCard(movieData) {
    const { href = '#', imgSrc, title, score } = movieData;

    const li = document.createElement('li');

    const a = document.createElement('a');
    a.href = href;

    const div = document.createElement('div');
    div.classList.add('item-card');

    const img = document.createElement('img');
    img.classList.add('item-thumbnail');
    img.src = imgSrc;
    img.alt = title;

    const $title = document.createElement('p');
    $title.classList.add('item-title');
    $title.textContent = title;

    const $score = document.createElement('p');
    $score.classList.add('item-score');
    $score.textContent = score;

    const $scoreImg = document.createElement('img');
    // FIXME: 경로를 찾을 수 있게 도와줘
    $scoreImg.src = '../assets/star_filled.png';
    $scoreImg.alt = '별점';

    $score.appendChild($scoreImg);
    div.appendChild(img);
    div.appendChild($title);
    div.appendChild($score);
    a.appendChild(div);
    li.appendChild(a);

    return li;
  }

  get card() {
    return this.#card;
  }
}
