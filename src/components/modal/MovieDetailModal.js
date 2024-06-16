import StarFilled from '../../assets/star_filled.png';
import StarEmpty from '../../assets/star_empty.png';

const MovieDetailModal = ({ title, src, genres, overview, vote_average }) => {
    const strGenres = genres.map((item) => item.name).join(',');

    const detailModal = `
 <div class="modal-detail">
        <div class="header">
            <h1>${title}</h1>
    <button class="close-button" style="color: white;">×</button>
        </div>
        <div class="content">
            <div class="poster">
                <img src=${src} alt=${title}>
            </div>
            <div>
                <div class="content-detail">
                    <div>
                        <div class='sub-header'>
                            <div class="genres">${strGenres}</div>
                            <div class="rating">
                            <img src=${StarFilled} alt="Star">
                            <span>${vote_average}</span>
                            </div>
                        </div>
                        <div class="description">
                            ${overview}
                        </div>
                    </div>
                    <div class="user-rating">
                        <span>내 별점</span>
                        <div class="stars">
                            <img src=${StarFilled} alt="Star">
                            <img src=${StarFilled} alt="Star">
                            <img src=${StarFilled} alt="Star">
                            <img src=${StarEmpty} alt="Star">
                            <img src=${StarEmpty} alt="Star">
                        </div>
                        <span>6 보통이에요</span>
                    </div>
            </div>
        </div>
 
    </div>
    `;

    return detailModal;
};

export default MovieDetailModal;
