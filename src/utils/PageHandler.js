const MOVIE_TOTAL_PAGE_LIMIT = 500;

const INITIAL_VALUE = {
  page: 1,
  totalPages: MOVIE_TOTAL_PAGE_LIMIT,
};

function PageEventHandler() {
  let attr = { ...INITIAL_VALUE };

  return {
    next() {
      if (attr.page >= attr.totalPages) {
        return {
          page: attr.page,
          done: true,
        };
      }
      attr.page = attr.page + 1;

      return {
        page: attr.page,
        done: attr.page >= attr.totalPages,
      };
    },
    reset() {
      attr = { ...INITIAL_VALUE };
    },
    getCurrentPage() {
      return attr.page;
    },
    setTotalPages(totalPages) {
      if (totalPages > MOVIE_TOTAL_PAGE_LIMIT) {
        throw TypeError(
          `최대 조회 가능한 페이지는 ${MOVIE_TOTAL_PAGE_LIMIT}까지 입니다.`
        );
      }
      attr.totalPages = totalPages;
    },
  };
}

const PageHandler = PageEventHandler();
export default PageHandler;
