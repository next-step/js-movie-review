import { Score } from './Score';

export function MovieCard({ title, src, voteAvg, starSrc }) {
    const liElement = document.createElement('li');

    const aElement = document.createElement('a');
    aElement.href = '#';

    const cardElement = document.createElement('div');
    cardElement.classList.add('item-card');

    const imageElement = document.createElement('img');
    imageElement.classList.add('item-thumbnail');
    imageElement.src = src;
    imageElement.loading = 'lazy';
    imageElement.alt = title;

    const titleElement = document.createElement('p');
    titleElement.classList.add('item-title');
    titleElement.innerText = title;

    const scoreElement = Score({ voteAvg: voteAvg, src: starSrc });

    cardElement.append(imageElement);
    cardElement.append(titleElement);
    cardElement.append(scoreElement);

    aElement.append(cardElement);
    liElement.append(aElement);

    return liElement;
}
