import { createBanner } from "./components/Banner";

addEventListener("load", () => {
  const app = document.querySelector("#app");

  const banner = createBanner();

  app.append(banner);
});
