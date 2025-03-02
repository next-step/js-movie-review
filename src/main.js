import { createFooter } from "src/shared/ui/footer";

addEventListener("load", () => {
  const app = document.querySelector("#app");

  const footer = createFooter();

  app.appendChild(footer);
});
