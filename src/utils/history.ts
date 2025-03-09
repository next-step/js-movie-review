export function updateHistory(
  query?: string,
  isInitial = false,
  pushState = true
) {
  if (!isInitial && pushState) {
    history.pushState(
      {},
      "",
      query ? `?search=${encodeURIComponent(query)}` : location.pathname
    );
  }
}
