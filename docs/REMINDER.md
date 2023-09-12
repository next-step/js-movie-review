```js
    // const movieListHTML = movieData.movieList
    //   .map(list => MovieItem(list))
    //   .join("");

    // console.log(
    //   "🚀 ~ file: Main.js:37 ~ updateMovieList ~ movieListHTML:",
    //   movieListHTML
    // );

 [object HTMLLIElement][object HTMLLIElement][object HTMLLIElement][object HTMLLIElement][object HTMLLIElement][object HTMLLIElement][object HTMLLIElement][object HTMLLIElement][object HTMLLIElement][object HTMLLIElement][object HTMLLIElement][object HTMLLIElement][object HTMLLIElement][object HTMLLIElement][object HTMLLIElement][object HTMLLIElement][object HTMLLIElement][object HTMLLIElement][object HTMLLIElement][object HTMLLIElement]
```

```js
const updateMovieList = () => {
  movieData.movieList.forEach(list => {
    const movieItemElement = MovieItem(list);
    $movieItemContainer.appendChild(movieItemElement);
  });
};
```

```

```
