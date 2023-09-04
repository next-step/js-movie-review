import { getPopularMovieLists } from '../api/fetchers.js';

const createMovieListItem = (result) => {
  const { poster_path: posterPath, title, vote_average: voteAverage } = result;

  const listItem = document.createElement('li');
  const a = document.createElement('a');
  const itemCard = document.createElement('div');
  const itemThumbnail = document.createElement('img');
  const itemTitle = document.createElement('p');
  const itemScore = document.createElement('p');
  const itemStarImage = document.createElement('img');
  const itemStarRating = document.createTextNode(voteAverage);

  a.href = '#';
  itemCard.classList.add('item-card');
  itemThumbnail.classList.add('item-thumbnail');
  itemThumbnail.src = `https://image.tmdb.org/t/p/w220_and_h330_face/${posterPath}`;
  itemThumbnail.loading = 'lazy';
  itemThumbnail.alt = title;
  itemTitle.classList.add('item-title');
  itemTitle.innerHTML = title;
  itemScore.classList.add('item-score');
  itemStarImage.src = './star_filled.png';
  itemStarImage.alt = '별점';

  listItem.appendChild(a);
  a.appendChild(itemCard);
  itemCard.appendChild(itemThumbnail);
  itemCard.appendChild(itemTitle);
  itemCard.appendChild(itemScore);
  itemScore.appendChild(itemStarImage);
  itemScore.appendChild(itemStarRating);

  return listItem;
};

const createMovieListItems = async (page) => {
  const $itemList = document.querySelector('.item-list');
  const $itemMoreButton = document.querySelector('#item-more-button');

  const { results } = await getPopularMovieLists(page);

  if (results.length < 20) {
    $itemMoreButton.style.display = 'none';
  }

  results.forEach((result) => {
    $itemList.appendChild(createMovieListItem(result));
  });
};

export const runGetMovieLists = () => {
  const $itemMoreButton = document.querySelector('#item-more-button');

  let page = 1;

  createMovieListItems(page);

  $itemMoreButton.addEventListener('click', () => {
    page += 1;

    createMovieListItems(page);
  });
};
