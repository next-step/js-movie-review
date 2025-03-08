import { AppFooter } from "./layout/AppFooter";
import { AppHeader } from "./layout/AppHeader";
import { AppMain } from "./layout/AppMain";
import { state } from "./shared/state";
import { toElement } from "./shared/ui";

window.addEventListener("load", () => {
  const app = document.querySelector("#app");

  // const { value: inputState, subscribe: inputStateSubscribe } = state("");
  const { value: inputState } = state("");

  app.innerHTML = toElement(`
    ${AppHeader({
      inputState,
    })}
    `);
  // ${AppMain({
  //   inputState,
  //   inputStateSubscribe,
  // })}
  // ${AppFooter()}
});
