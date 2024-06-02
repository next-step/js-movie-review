class App {
  currentPage = 1;

  async init(movieList) {
    await movieList.fetchMovies(this.currentPage);
  }

  async fetchNextPage(movieList) {
    this.currentPage++;
    await movieList.fetchMovies(this.currentPage);
  }
}

export default App;
