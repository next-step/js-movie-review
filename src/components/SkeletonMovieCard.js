export function SkeletonMovieCard() {
    const liElement = document.createElement('li');
    liElement.classList.add('skeleton-item');
    liElement.innerHTML = `
        <a href="#">
            <div class="item-card skeleton">
                <img class="item-thumbnail skeleton" loading="lazy" alt="">
                <p class="item-title skeleton"></p>
                <p class="item-score skeleton" style="height: 19.2px;"></p>
                    
                
            </div>
        </a>
    `;
    return liElement;
}
