export interface InfiniteScrollOptions {
  container: HTMLElement;
  onLoadMore: () => void;
  hasMore: () => boolean;
  threshold?: number;
}

const initInfiniteScroll = (options: InfiniteScrollOptions) => {
  const { container, onLoadMore, hasMore, threshold = 1 } = options;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore()) {
        onLoadMore();
      }
    },
    { threshold }
  );

  const observeLastItem = (): void => {
    const items = container.querySelectorAll(".movie-item");
    if (!items.length) {
      return;
    }

    const lastItem = items[items.length - 1];
    observer.observe(lastItem);
  };

  const disconnect = (): void => observer.disconnect();

  return { observeLastItem, disconnect };
};

export default initInfiniteScroll;
