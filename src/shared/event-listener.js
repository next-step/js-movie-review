import { getFavoriteMovies } from "../api/movieApiClient";

export const addMoreEvent = () => {
  const fetchNextPage = async () => {
    console.log("TEST");
    pageState.value += 1;
    const data = await getFavoriteMovies(pageState.value);
    mainState.value = [...mainState.value, ...data];
  };

  // 초기 비동기 렌더링
  const fetchData = async () => {
    const data = await getFavoriteMovies(pageState.value);
    mainState.value = data;
  };
  document.querySelector(".add-more").addEventListener("click", fetchNextPage);
};
