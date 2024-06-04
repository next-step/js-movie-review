export let currentComponent = null;

export async function createComponent(component, props) {
  const previousComponent = currentComponent;

  currentComponent = { name: component.name, stateIndex: 0 };

  const componentInstance = await component(props);

  currentComponent = previousComponent;

  return componentInstance;
}
