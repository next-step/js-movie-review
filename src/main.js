import { AppFooter } from "./layout/AppFooter";
import { AppHeader } from "./layout/AppHeader";
import { AppMain } from "./layout/AppMain";
import { state } from "./shared/state";

window.addEventListener("load", () => {
  const app = document.querySelector("#app");

  const { value: inputState, subscribe: inputStateSubscribe } = state("");

  if (app) {
    app.appendChild(
      AppHeader({
        inputState,
      }),
    );
    app.appendChild(
      AppMain({
        inputState,
        inputStateSubscribe,
      }),
    );
    app.appendChild(AppFooter());
  }
});
