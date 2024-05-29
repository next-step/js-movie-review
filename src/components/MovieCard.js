const MovieCardWrapper = () => {
  const $el = document.createElement('div');
  $el.classList.add('item-card');
  return $el;
};

const MovieEmptyThumbnail = () => {
  const $el = document.createElement('img');

  $el.className = 'item-thumbnail skeleton';
  $el.loading = 'lazy';
  $el.draggable = false;

  return $el;
};

const MovieTitle = ({ title }) => {
  const $el = document.createElement('p');
  $el.className = 'item-title skeleton';
  $el.textContent = title;

  return $el;
};

const MovieScore = ({ score, icon }) => {
  const $icon = document.createElement('img');
  const $el = document.createElement('p');
  $el.className = 'item-score skeleton';
  $el.textContent = score;
  $icon.src = icon;
  $el.appendChild($icon);

  return $el;
};

const MovieCard = ({ title, poster, score, icon }) => {
  const $li = document.createElement('li');
  const $cardWrapper = MovieCardWrapper();
  const $image = MovieEmptyThumbnail({ poster, title });
  const $title = MovieTitle({ title });
  const $score = MovieScore({ score, icon });

  $cardWrapper.appendChild($image);
  $cardWrapper.appendChild($title);
  $cardWrapper.appendChild($score);
  $li.appendChild($cardWrapper);

  const img = new Image();
  img.src = poster;
  img.addEventListener('load', () => {
    setTimeout(() => {
      $image.alt = `${title} 포스터`;
      $image.src = poster;

      $image.classList.remove('skeleton');
      $title.classList.remove('skeleton');
      $score.classList.remove('skeleton');
    }, 800);
  });

  return $li;
};

export default MovieCard;
