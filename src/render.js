import header from "./component/Header";
import movieContainer from "./component/MovieContainer";
import movieCardList from "./component/MoiveCardList";
import movieCardListRefetch from "./component/MovieCardListRefetch";
import footer from "./component/Footer";

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

    console.log(movieCardList({ cardDatas }));
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
};

export default render;
