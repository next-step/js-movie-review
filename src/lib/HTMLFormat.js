export const HTMLFormat = Object.freeze({
	HEADER_LOGO: `<h1><img src="./templates/logo.png" alt="MovieList 로고" /></h1>`,
	MAIN_SECTION: `<section class="item-view"><h2>지금 인기 있는 영화</h2></section>`,
	MOVIE_CARD: (title, vote, posterPath, id) => `
			<div class="movie-card">
				<div class="item-card">
					<img
						class="item-thumbnail"
						src="https://image.tmdb.org/t/p/w220_and_h330_face/${posterPath}"
						loading="lazy"
						alt="${title}"
						data-index="${id}"
					/>
					<p class="item-title">${title}</p>
					<p class="item-score"><img src="./templates/star_filled.png" alt="별점" />${vote}</p>
				</div>
			</div>
	`,
	MODAL: (title, vote, posterPath, description, genre) => `
			<div class="modal">
        <div class="modal-inner">
        	<div class="modal-header">
        		<div >${description}</div>
          	<div class="modal-close"></div>
					</div>
          <div class="modal-content-box">
          	  <img
								class="modal-item-poster"
								src="https://image.tmdb.org/t/p/w292_and_h433_face/${posterPath}"
								loading="lazy"
								alt="${title}"
							/>
							<div class="modal-item-box">
								<div class="modal-item-genre">
									<div>${genre}</div>
									<div class="modal-item-score">
										<img src="./templates/star_filled.png" alt="별점" />
										<div>${vote}</div>
									</div>
								</div>
								<div class="modal-item-detail">${description}</div>
							</div>
          </div>
        </div>
      </div>
	`,
});
