export function MovieCard({ title = '', src = '', voteAvg = '', starSrc = '', loading = false }) {
    if (loading) {
        return SkeletonMovieCard();
    }

    const liElement = document.createElement('li');

    const newVoteAvg = loading ? '' : Number(voteAvg).toFixed(2);
    const imageSrc = loading ? '' : src;
    const imageAlt = title;

    liElement.innerHTML = `
        <a href="#">
            <div class="item-card">
                <img class="item-thumbnail" loading="lazy" alt="${imageAlt}" src="${imageSrc}">
                <p class="item-title">${title}</p>
                <p class="item-score">
                    <span>${newVoteAvg}</span>
                    <img src="${starSrc}" alt="별점" loading="lazy">
                </p>
            </div>
        </a>
    `;

    return liElement;
}
