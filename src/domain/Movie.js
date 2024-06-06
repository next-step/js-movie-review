import { getPopularMovies } from "../api/movie";

export class Movie {
  constructor() {
    this.list = [];
    this.currentPage = 1;
    this.hasMore = true;
  }

  async loadMore() {
    if (!this.hasMore) return;

    try {
      const data = await getPopularMovies(this.currentPage);
      this.list.push(...data.results);
      this.hasMore = data.page < data.total_pages;
      this.currentPage += 1;
      return data.results;
    } catch (error) {
      this.hasMore = false;
      throw error;
    }
  }
}
