import render from "./App";
import "../templates/reset.css";
import "../templates/common.css";
import { getMovieList } from "./api";

const requestParam = {
  page: 1,
};
async function footerClick() {
  const response = await getMovieList({ page: requestParam.page });
  requestParam.page = requestParam.page + 1;
  const result = response.results.map((movieInfo) => ({
    href: "#",
    src: movieInfo.backdrop_path,
    title: movieInfo.title,
    alt: movieInfo.title,
    score: movieInfo.vote_average,
  }));
  render.movieCardListRefetch({
    selector: "ul",
    cardDatas: result,
  });
}

async function run() {
  try {
    render.header({ selector: "#app" });
    render.movieContainer({ selector: "#app" });

    const response = await getMovieList({ page: requestParam.page });
    requestParam.page = requestParam.page + 1;
    const result = response.results.map((movieInfo) => ({
      href: "#",
      src: movieInfo.backdrop_path,
      title: movieInfo.title,
      alt: movieInfo.title,
      score: movieInfo.vote_average,
    }));
    console.log("result", result);

    render.movieCardList({
      selector: "section",
      cardDatas: result,
    });
    render.footer({ selector: "section", onClick: footerClick });
  } catch (error) {
    alert("에러가 발생했습니다.");
  }
}

await run();
