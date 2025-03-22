import { AppFooter } from "./layout/AppFooter";
import { AppHeader } from "./layout/AppHeader";
import { AppMain } from "./layout/AppMain";
import { renderer } from "./shared/renderer";
// import { state } from "./shared/state";
import { toElement } from "./shared/ui";

window.addEventListener("load", () => {
  const app = document.querySelector("#app");

  const [inputState, setInputState] = renderer.state("app-input", "");

  const AppHeaderComponent = AppHeader({
    setInputState,
  });

  const AppMainComponent = AppMain({
    inputState,
  });

  if (app) {
    app.appendChild(AppHeaderComponent);
    app.appendChild(AppMainComponent);
  }
});

// ${AppMain({
//   inputState,
//   inputStateSubscribe,
// }).outerHTML}
// ${AppFooter().outerHTML}

// ${AppMain({
//   inputState,
//   inputStateSubscribe,
// })}
// ${AppFooter()}
