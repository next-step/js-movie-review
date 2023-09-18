export const convertTMDBMovieListResponse = response => {
	return {
		totalPages: response['total_pages'],
		movies: response.results.map(result => ({
			title: result.title,
			vote: result['vote_average'],
			posterPath: result['poster_path'],
			id: result.id,
		})),
	};
};

export const convertTMDBMovieDetailResponse = response => {
	return {
		title: response.title,
		id: response.id,
		genres: response.genres.map(genre => genre.name),
		posterPath: response['poster_path'],
		description: response.overview,
		vote: response['vote_average'],
	};
};
