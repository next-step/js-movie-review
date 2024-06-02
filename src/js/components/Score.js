export function Score({ voteAvg, src }) {
    const scoreElement = document.createElement('p');
    scoreElement.classList.add('item-score');

    const voteAvgElement = document.createElement('span');
    const newVoteAvg = Number(voteAvg).toFixed(2);
    voteAvgElement.innerText = newVoteAvg;

    const starImgElement = document.createElement('img');
    starImgElement.src = src;
    starImgElement.alt = '별점';
    starImgElement.loading = 'lazy';

    scoreElement.appendChild(voteAvgElement);
    scoreElement.appendChild(starImgElement);

    return scoreElement;
}
