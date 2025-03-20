export const updateHistory = (
  query?: string,
  isInitial = false,
  pushState = true
): void => {
  if (!isInitial && pushState) {
    history.pushState(
      {},
      "",
      query ? `?search=${encodeURIComponent(query)}` : location.pathname
    );
  }
};
