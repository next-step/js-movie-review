import { Headers } from "./components/Headers";

addEventListener("load", () => {
  const wrap = document.querySelector("#wrap");
  wrap.insertAdjacentHTML('afterbegin',Headers());

  
});
