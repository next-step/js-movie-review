export const convertTMDBResponse = response => {
	return {
		totalPages: response['total_pages'],
		movies: response.results.map(result => ({
			title: result.title,
			vote: result['vote_average'],
			posterPath: result['poster_path'],
			id: result.id,
			description: result.overview,
		})),
	};
};
