export default function MovieItem({ $target }) {
  const $li = document.createElement("li");

  $li.innerText = "dd";

  $target.append($li);
}
