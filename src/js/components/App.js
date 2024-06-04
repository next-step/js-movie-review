import { createComponent } from "../createComponent";
import { Header } from "./Header";
import { Main } from "./Main";

export async function App() {
  const header = await createComponent(Header);
  const main = await createComponent(Main);

  const bindEvents = () => {
    main.bindEvents();
  };

  return {
    element: `
        ${header.element}
        ${main.element}
    `,
    bindEvents,
  };
}
