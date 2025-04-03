export const eventEmitter = new EventTarget();

const createRenderer = () => {
  const globalState = [];

  return {
    state(key, initialState) {
      const initState = {
        value: initialState,
      };

      const handler = {
        set(target, prop, value) {
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
  };
};

export const renderer = createRenderer();
