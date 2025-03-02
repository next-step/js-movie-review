import { createHeader } from "src/shared/ui/header";
import { createFooter } from "src/shared/ui/footer";

addEventListener("load", () => {
  const app = document.querySelector("#app");

  const header = createHeader();
  const footer = createFooter();

  app.append(header, footer);
});
