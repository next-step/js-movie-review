export const searchParams = {
  get: (key) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  },

  set: (key, value, replace = false) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);

    const newUrl = `${window.location.pathname}?${params.toString()}`;

    if (replace) {
      window.history.replaceState({}, '', newUrl);
    } else {
      window.history.pushState({}, '', newUrl);
    }
  },
};
