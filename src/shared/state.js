// 상태

// 핸들러
const getHandler = (caller) => {
  const handler = {
    listeners: [],
    set(target, key, value) {
      if (key in target && !Object.is(target[key], value)) {
        // eslint-disable-next-line no-param-reassign
        target[key] = value;
        handler.notify(key, value);
        console.log(typeof caller, caller.render);
        if (caller && caller.render) {
          console.log(typeof caller);
          caller.render();
        }

        return true;
      }
      return false;
    },
    subscribe(listener) {
      handler.listeners.push(listener);
    },

    unsubscribe(listener) {
      handler.listeners = this.listeners.filter((l) => l !== listener);
    },

    notify(key, value) {
      handler.listeners.forEach((listener) => listener(key, value));
    },
  };

  return handler;
};

// 1. 상태를 정의할 수 있는 함수가 필요
export const state = (initialState, caller) => {
  const handler = getHandler(caller);

  const innerState = new Proxy(
    {
      value: initialState,
    },
    handler,
  );

  return { value: innerState, ...handler };
};

// UI
