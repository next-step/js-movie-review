import StarImage from "../../templates/star_filled.png";

const renderMovieCard = (movie) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const div = document.createElement("div");
  const thumbnail = document.createElement("img");
  const title = document.createElement("p");
  const scoreTitle = document.createElement("p");
  const scoreImage = document.createElement("img");

  li.appendChild(a);
  a.append(div);
  div.append(thumbnail);
  div.append(title);
  div.append(scoreTitle);
  scoreTitle.append(scoreImage);

  div.classList.add("item-card");
  thumbnail.classList.add("item-thumbnail");
  title.classList.add("item-title");
  scoreTitle.classList.add("item-score");

  if (!movie) {
    li.classList.add("skeleton");
    thumbnail.classList.add("skeleton");
    title.classList.add("skeleton");
    scoreTitle.classList.add("skeleton");
  } else {
    thumbnail.classList.add("skeleton");
    thumbnail.src = `https://image.tmdb.org/t/p/w220_and_h330_face${movie.image}`;
    thumbnail.alt = movie.title;

    title.textContent = movie.title;

    scoreTitle.textContent = movie.rating;
    scoreImage.src = StarImage;
    scoreImage.alt = "별점";
  }

  return li;
};

export default renderMovieCard;
