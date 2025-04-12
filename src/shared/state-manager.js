export const eventEmitter = new EventTarget();

const createStateManager = () => ({
  state(key, initialState) {
    const initState = {
      value: initialState,
    };

    const handler = {
      set(target, prop, value) {
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;
        eventEmitter.dispatchEvent(new CustomEvent(key));
        return true;
      },
    };

    const proxyState = new Proxy(initState, handler);

    const setState = (newValue) => {
      proxyState.value = newValue;
    };

    return [proxyState, setState];
  },
});

export const stateManager = createStateManager();
