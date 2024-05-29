import star_filled from "../templates/star_filled.png";
import header from "./component/Header";
import movieContainer from "./component/MovieContainer";
import movieCardList from "./component/MoiveCardList";
import movieCardListRefetch from "./component/MovieCardListRefetch";
import footer from "./component/Footer";

const render = {
  header: ({ selector }) => {
    const seletcedDom = document.querySelector(selector);
    if (!seletcedDom) {
      throw new Error("header dom not found");
    }

    seletcedDom.appendChild(header().dom);
  },
  movieContainer: ({ selector }) => {
    const seletcedDom = document.querySelector(selector);
    if (!seletcedDom) {
      throw new Error("movieContainer dom not found");
    }

    seletcedDom.appendChild(movieContainer().dom);
  },
  movieCardList: ({ selector, cardDatas }) => {
    const seletcedDom = document.querySelector(selector);
    if (!seletcedDom) {
      throw new Error("movieContainer dom not found");
    }

    seletcedDom.appendChild(movieCardList({ cardDatas }).dom);
  },
  movieCardListRefetch: ({ selector, cardDatas }) => {
    const seletcedDom = document.querySelector(selector);
    if (!seletcedDom) {
      throw new Error("movieContainer dom not found");
    }

    movieCardListRefetch({ cardDatas });
  },
  footer: ({ selector, onClick }) => {
    const seletcedDom = document.querySelector(selector);
    if (!seletcedDom) {
      throw new Error("footer dom not found");
    }

    seletcedDom.appendChild(footer({ onClick }).dom);
  },
};

export default render;
