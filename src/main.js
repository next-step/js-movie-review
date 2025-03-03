import { AppFooter } from "./layout/AppFooter";
import { AppHeader } from "./layout/AppHeader";
import { AppMain } from "./layout/AppMain";

window.addEventListener("load", () => {
  const app = document.querySelector("#app");

  // const buttonImage = document.createElement("img");
  // buttonImage.src = image;

  if (app) {
    app.appendChild(AppHeader());
    app.appendChild(AppMain());
    app.appendChild(AppFooter());
  }
});
