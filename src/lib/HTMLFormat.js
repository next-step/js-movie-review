export const HTMLFormat = Object.freeze({
	HEADER_LOGO: `<h1><img src="./templates/logo.png" alt="MovieList 로고" /></h1>`,
	MAIN_SECTION: `<section class="item-view"><h2>지금 인기 있는 영화</h2></section>`,
	MOVIE_CARD: (title, vote, posterPath) => `
		<li>
			<a href="#">
				<div class="item-card">
					<img
						class="item-thumbnail"
						src="https://image.tmdb.org/t/p/w220_and_h330_face/${posterPath}"
						loading="lazy"
						alt="${title}"
					/>
					<p class="item-title">${title}</p>
					<p class="item-score"><img src="./templates/star_filled.png" alt="별점" />${vote}</p>
				</div>
			</a>
		</li>
	`,
});
