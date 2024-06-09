import { getPopularMovies, searchMovies } from "../api/movie";

export class Movie {
  constructor() {
    this.list = [];
    this.currentPage = 1;
    this.hasMore = true;
    this.query = "";
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.update());
  }

  async fetchApi() {
    if (this.query) {
      return await searchMovies(this.query, this.currentPage);
    }

    return await getPopularMovies(this.currentPage);
  }

  async loadMore() {
    if (!this.hasMore) return;

    try {
      const data = await this.fetchApi();
      this.list.push(...data.results);
      this.hasMore = data.page < data.total_pages;
      this.currentPage += 1;
      this.notifyObservers();
    } catch (error) {
      this.hasMore = false;
      throw error;
    }
  }

  setSearchQuery(query) {
    this.query = query;
    this.list = [];
    this.currentPage = 1;
    this.hasMore = true;
    this.notifyObservers();
  }
}
