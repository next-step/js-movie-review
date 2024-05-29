const INITIAL_VALUE = {
  page: 1,
  size: 20,
  totalPages: 500,
};

function PageEventHandler() {
  let attr = { ...INITIAL_VALUE };

  return {
    next() {
      attr.page = attr.page + 1;
      return attr.page;
    },
    getCurrentPage() {
      return attr.page;
    },
    reset() {
      attr = { ...INITIAL_VALUE };
    },
  };
}

const PageHandler = PageEventHandler();
export default PageHandler;
