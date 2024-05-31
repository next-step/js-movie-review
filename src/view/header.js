import { Logo } from "./logo";

export const Header = () => {
  const header = document.createElement("header");

  header.appendChild(Logo);
  header.appendChild($("#app"));
};
