import { $ } from "../utils/querySelector";
import Header from "./header";

const layout = () => {
  const body = $("body");
  const appDiv = document.createElement("div");
  const main = document.createElement("main");
  const header = new Header().element;
  appDiv.id = "app";
  appDiv.appendChild(header);
  appDiv.appendChild(main);
  body.appendChild(appDiv);
};

export default layout;
