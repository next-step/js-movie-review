import header from "./component/Header";
import movieContainer from "./component/MovieContainer";
import movieCardList from "./component/MoiveCardList";
import movieCardListRefetch from "./component/MovieCardListRefetch";
import footer from "./component/Footer";
import skeleton from "./component/Skeleton";
import list from "./component/List";

function validateEelement(selector, errorMessage) {
  const seletcedDom = document.querySelector(selector);
  if (!seletcedDom) {
    throw new Error(errorMessage);
  }

  return seletcedDom;
}
const render = {
  header: ({ selector }) => {
    const seletcedDom = validateEelement(selector, "header dom not found");

    seletcedDom.appendChild(header());
  },
  movieContainer: ({ selector }) => {
    const seletcedDom = validateEelement(
      selector,
      "movieContainer dom not found"
    );

    seletcedDom.appendChild(movieContainer());
  },
  movieCardList: ({ selector, cardDatas }) => {
    const seletcedDom = validateEelement(
      selector,
      "movieCardList dom not found"
    );

    seletcedDom.appendChild(movieCardList({ cardDatas }));
  },
  movieCardListRefetch: ({ selector, cardDatas }) => {
    validateEelement(selector, "movieCardListRefetch dom not found");

    movieCardListRefetch({ cardDatas });
  },
  footer: ({ selector, onClick }) => {
    const seletcedDom = validateEelement(selector, "footer dom not found");

    seletcedDom.appendChild(footer({ onClick }));
  },
  skeleton: ({ selector }) => {
    const seletcedDom = validateEelement(selector, "skeleton dom not found");

    seletcedDom.appendChild(skeleton());
  },
  skeletonList: ({ selector }) => {
    const seletcedDom = validateEelement(
      selector,
      "skeletonList dom not found"
    );

    const listDom = list();
    Array.from({ length: 20 }).forEach(() => listDom.appendChild(skeleton()));

    seletcedDom.appendChild(listDom);
  },
  remmoveSkeletonList: ({ selector }) => {
    validateEelement(selector, "remmoveSkeletonList dom not found");

    const skeletons = document.querySelectorAll(selector);
    console.log("skeletons", skeletons);

    skeletons.forEach((skeleton) =>
      skeleton.closest("ul").removeChild(skeleton)
    );
  },
};

export default render;
