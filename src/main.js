import { AppDetail } from "./layout/AppDetail";
import { AppHeader } from "./layout/AppHeader";
import { AppMain } from "./layout/AppMain";
import { stateManager } from "./shared/state-manager";

window.addEventListener("load", () => {
  const app = document.querySelector("#app");

  const [inputState, setInputState] = stateManager.state("app-input", "");

  const AppHeaderComponent = AppHeader({
    setInputState,
  });

  const AppMainComponent = AppMain({
    inputState,
  });

  const AppDetailComponent = AppDetail();

  if (app) {
    app.appendChild(AppHeaderComponent);
    app.appendChild(AppMainComponent);
    app.appendChild(AppDetailComponent);
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
