import { Score } from './Score';

export function MovieCard({ title, src, voteAvg, starSrc, loading = false }) {
    const liElement = document.createElement('li');
    const aElement = document.createElement('a');
    aElement.href = '#';
    const cardElement = document.createElement('div');
    const imageElement = document.createElement('img');
    const titleElement = document.createElement('p');
    const scoreElement = Score({ voteAvg: voteAvg, src: starSrc, loading: loading });

    if (loading) {
        cardElement.classList.add('item-card');
        imageElement.classList.add('item-thumbnail', 'skeleton');
        titleElement.classList.add('item-title', 'skeleton');
        imageElement.loading = 'lazy';
        imageElement.alt = title;
        titleElement.innerText = title;
    } else {
        cardElement.classList.add('item-card');
        imageElement.classList.add('item-thumbnail');
        titleElement.classList.add('item-title');
        imageElement.loading = 'lazy';
        imageElement.alt = title;
        imageElement.src = src;
        titleElement.innerText = title;
    }

    cardElement.append(imageElement);
    cardElement.append(titleElement);
    cardElement.append(scoreElement);

    aElement.append(cardElement);
    liElement.append(aElement);

    return liElement;
}
