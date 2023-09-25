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

`throw error vs throw new Error`

```

```

- https://www.themoviedb.org/talk/5f5b7579629b2c0037c28933
