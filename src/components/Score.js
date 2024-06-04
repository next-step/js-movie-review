export function Score({ voteAvg, src, loading = false }) {
    const scoreElement = document.createElement('p');
    const voteAvgElement = document.createElement('span');
    const starImgElement = document.createElement('img');

    if (loading) {
        scoreElement.classList.add('item-score', 'skeleton');
        const tempElement = document.createElement('div');
        tempElement.style.height = '19.2px';
        scoreElement.appendChild(tempElement);
    } else {
        scoreElement.classList.add('item-score');
        const newVoteAvg = Number(voteAvg).toFixed(2);
        voteAvgElement.innerText = newVoteAvg;
        starImgElement.src = src;
        starImgElement.alt = '별점';
        starImgElement.loading = 'lazy';

        scoreElement.appendChild(voteAvgElement);
        scoreElement.appendChild(starImgElement);
    }

    return scoreElement;
}
