export class Movie {
    #title = '';
    #poster_path = '';
    #vote_average = '';
    #adult = '';
    #backdrop_path = '';
    #genre_ids = [];
    #id = '';
    #original_language = '';
    #original_title = '';
    #overview = '';
    #popularity = '';
    #release_date = '';
    #video = '';
    #vote_count = '';

    constructor({
        title = '',
        poster_path = '',
        vote_average = '',
        adult = '',
        backdrop_path = '',
        genre_ids = [],
        id = '',
        original_language = '',
        original_title = '',
        overview = '',
        popularity = '',
        release_date = '',
        video = '',
        vote_count = ''
    }) {
        this.#title = title;
        this.#poster_path = poster_path;
        this.#vote_average = vote_average;
        this.#adult = adult;
        this.#backdrop_path = backdrop_path;
        this.#genre_ids = genre_ids;
        this.#id = id;
        this.#original_language = original_language;
        this.#original_title = original_title;
        this.#overview = overview;
        this.#popularity = popularity;
        this.#release_date = release_date;
        this.#video = video;
        this.#vote_count = vote_count;
    }

    getTitle() {
        return this.#title;
    }

    getPosterPath() {
        return this.#poster_path;
    }

    getVoteAverage() {
        return this.#vote_average;
    }

    getAdult() {
        return this.#adult;
    }

    getBackdropPath() {
        return this.#backdrop_path;
    }

    getGenreIds() {
        return this.#genre_ids;
    }

    getId() {
        return this.#id;
    }

    getOriginalLanguage() {
        return this.#original_language;
    }

    getOriginalTitle() {
        return this.#original_title;
    }

    getOverview() {
        return this.#overview;
    }

    getPopularity() {
        return this.#popularity;
    }

    getReleaseDate() {
        return this.#release_date;
    }

    getVideo() {
        return this.#video;
    }

    getVoteCount() {
        return this.#vote_count;
    }
}
