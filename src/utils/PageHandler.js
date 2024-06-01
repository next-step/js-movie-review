const MOVIE_TOTAL_PAGE_LIMIT = 500;

const INITIAL_VALUE = {
  page: 1,
  totalPages: MOVIE_TOTAL_PAGE_LIMIT,
};

function PageEventHandler() {
  let attr = { ...INITIAL_VALUE };

  return {
    next() {
      if (!this.hasNextPage()) {
        return {
          page: attr.page,
          done: true,
        };
      }
      attr.page = attr.page + 1;

      return {
        page: attr.page,
        done: !this.hasNextPage(),
      };
    },
    getCurrentPage() {
      return attr.page;
    },
    setTotalPages(totalPages) {
      if (totalPages > MOVIE_TOTAL_PAGE_LIMIT) {
        return;
      }
      attr.totalPages = totalPages;
    },
    hasNextPage() {
      return attr.page < attr.totalPages;
    },
  };
}

const PageHandler = PageEventHandler();
export default PageHandler;
