import "./css/common.css";
import "./css/reset.css";
import { Header } from "./js/components/header/header";
import { Main } from "./js/components/main/main";

addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");
  const header = Header.render();
  const main = await Main.render();

  app.appendChild(header);
  app.appendChild(main);
});
