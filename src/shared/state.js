// 상태

// 핸들러
const handler = {
  set(target, key, value) {
    if (key in target) {
      // eslint-disable-next-line no-param-reassign
      target[key] = value;
      return true;
    }
    return false;
  },
};

// 2. 상태를 변경할 때마다 탐지한다.
const stateProxy = (state) => new Proxy(state, handler);

// 1. 상태를 정의할 수 있는 함수가 필요
export const state = (initialState) => {
  const innerState = stateProxy({
    value: initialState,
  });

  return innerState;
};

// UI
