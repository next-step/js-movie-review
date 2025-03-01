// 상태

// 핸들러
const handler = {
  listeners: [],
  set(target, key, value) {
    if (key in target) {
      // eslint-disable-next-line no-param-reassign
      target[key] = value;
      handler.notify(key, value);
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

// 1. 상태를 정의할 수 있는 함수가 필요
export const state = (initialState) => {
  const innerState = new Proxy(
    {
      value: initialState,
    },
    handler,
  );

  return { value: innerState, ...handler };
};

// UI
