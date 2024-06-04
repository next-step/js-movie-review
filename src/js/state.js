import { currentComponent } from "./createComponent";
import { render } from "./render";

const componentStates = {};

export function useState(initialValue) {
  let { name, stateIndex } = currentComponent;

  if (!componentStates[name]) {
    componentStates[name] = [];
  }

  if (componentStates[name][stateIndex] === undefined) {
    componentStates[name][stateIndex] = initialValue;
  }

  const state = componentStates[name][stateIndex];
  const setState = async (updatedValue) => {
    componentStates[name][stateIndex] = updatedValue;
    await render();
  };

  currentComponent.stateIndex += 1;

  return [state, setState];
}
