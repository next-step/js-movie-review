export const ROUTES = {
  "/": {
    path: "/",
    component: async () => {
      const module = await import("src/pages/popular-movies");
      return await module.popularMovies();
    },
  },
  "/search": {
    path: "/search",
    component: async () => {
      const module = await import("src/pages/search-results");
      return await module.searchResults();
    },
  },
};

export const matchRoute = async () => {
  const pathname = window.location.pathname;
  const route = Object.keys(ROUTES).find((route) => route === pathname);
  return route
    ? await ROUTES[route].component()
    : await ROUTES["/"].component();
};

export const navigate = async (path) => {
  window.history.pushState(null, "", path);
  return await matchRoute();
};
