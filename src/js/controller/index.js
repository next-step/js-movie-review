import { Header } from "../components/header/header";
import { movieCardsList, skeleton } from "../components/main";
import { Main } from "../components/main/main";
import { MovieList } from "../domain/MovieList";

export class Controller {
    #currentPage = 0

    constructor(){}

    async init(){
        const app = document.getElementById("app");
        const header = Header.render();
        const main = await Main.render();
      
        app.appendChild(header);
        app.appendChild(main);

        this.loadMovieList()
    }

    async loadMovieList () {
        try{
            skeleton.load();

            const movies = await this.generateMovieList(this.#currentPage);
            movieCardsList.loadMovieList(movies);

            skeleton.remove();
        } catch (error){
            console.error(error);
            skeleton.remove();
        }
    }

    async generateMovieList({ page = 1 }) {
        const movieList = new MovieList();
        await movieList.generateMovies({ page });

        return movieList.movies;
    }
}