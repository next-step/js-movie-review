import { getPopularMovieLists } from '../api/fetchers.js';

const lazyLoad = (target) => {
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (
          entry.target.className.includes('item-title') ||
          entry.target.className.includes('item-score')
        ) {
          entry.target.classList.remove('skeleton');
        } else {
          const img = entry.target;
          const src = img.getAttribute('data-src');

          img.setAttribute('src', src);
        }

        observer.disconnect();
      }
    });
  });
  obs.observe(target);
};

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

  listItem.classList.add('item');
  a.href = '#';
  itemCard.classList.add('item-card');
  itemThumbnail.classList.add('item-thumbnail', 'skeleton');
  itemThumbnail.dataset.src = `https://image.tmdb.org/t/p/w220_and_h330_face/${posterPath}`;
  itemThumbnail.loading = 'lazy';
  itemThumbnail.alt = title;
  itemTitle.classList.add('item-title', 'skeleton');
  itemTitle.innerHTML = title;
  itemScore.classList.add('item-score', 'skeleton');
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

  try {
    const { results } = await getPopularMovieLists(page);

    if (results.length < 20) {
      $itemMoreButton.style.display = 'none';
    }

    results.forEach((result) => {
      $itemList.appendChild(createMovieListItem(result));
    });

    const lazyTargets = document.querySelectorAll('.skeleton');
    lazyTargets.forEach(lazyLoad);
  } catch (error) {
    throw new Error('FETCH ERROR');
  }
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
