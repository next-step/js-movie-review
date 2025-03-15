interface Route {
  path: string;
  component: () => Promise<HTMLElement>;
}

export const ROUTES: {
  [key: string]: Route;
} = {
  "": {
    path: "",
    component: async () => {
      const module = await import("src/pages/popular-movies");
      return await module.popularMovies();
    },
  },
  search: {
    path: "search",
    component: async () => {
      const module = await import("src/pages/search-results");
      return await module.searchResults();
    },
  },
};

export const matchRoute = async () => {
  const hash = window.location.hash.slice(1); // '#' 제거
  const pathname = hash.split("?")[0];

  const route = Object.keys(ROUTES).find((route) => route === pathname);
  return route ? await ROUTES[route].component() : await ROUTES[""].component();
};

export const navigate = async (path: string) => {
  const normalizedPath = path.startsWith("#") ? path.slice(1) : path;
  window.location.hash = normalizedPath;
  return await matchRoute();
};
