import Button from "../components/button";
import FullWidthButton from "../components/button/fullWidthButton";
import MovieList from "../components/movieList";
import Skeleton from "../components/skeleton";
import Movie from "../domain/movie";

class MovieController {
  constructor() {
    this.skeleton = new Skeleton();
    this.movie = new Movie();
    this.movieList = new MovieList();
    this.renderMovies = MovieList.renderMovies;
    this.init();
    this.moreButtonInit();
  }

  async init() {
    this.movieList.render("main");
    await this.loadMoviesHandler();
  }

  async moreButtonInit() {
    const moreButton = new Button(new FullWidthButton("더 보기").element, async () => {
      await this.loadMoviesHandler();
    });
    moreButton.render("section.item-view");
  }

  async loadMoviesHandler() {
    try {
      this.skeleton.renderSkeletons();
      await this.movie.load();
      this.skeleton.remove();
      this.renderMovies(this.movie.list);
    } catch (error) {
      this.skeleton.remove();
      alert("영화 정보를 불러오는 데 실패했습니다.");
    }
  }
}

export default MovieController;
