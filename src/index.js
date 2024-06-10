import render from "./render";
import "../templates/reset.css";
import "../templates/common.css";
import { getMovieList } from "./api";

const requestParam = {
  page: 1,
};
async function movieCardListRefetch() {
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

    // 스켈레톤
    render.skeletonList({ selector: "section" });

    const response = await getMovieList({ page: requestParam.page });
    requestParam.page = requestParam.page + 1;
    const result = response.results.map((movieInfo) => ({
      href: "#",
      src: movieInfo.backdrop_path,
      title: movieInfo.title,
      alt: movieInfo.title,
      score: movieInfo.vote_average,
    }));

    render.remmoveSkeletonList({ selector: ".skeleton-li" });

    render.movieCardList({
      selector: "section",
      cardDatas: result,
    });
    render.footer({ selector: "section", onClick: movieCardListRefetch });
  } catch (error) {
    console.log("에러가 발생했습니다.", error);
  }
}

await run();
