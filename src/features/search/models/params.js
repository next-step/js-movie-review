import AbstractParamsManager from "src/shared/util/params";

class SearchParamsManager extends AbstractParamsManager {
  PARAMS = {
    KEYWORD: "keyword",
  };

  constructor() {
    super("search");
  }

  setKeyword(keyword) {
    this.setParams({
      [this.PARAMS.KEYWORD]: keyword,
    });
  }

  getKeyword() {
    return this.getParam(this.PARAMS.KEYWORD);
  }
}

export const searchParamsManager = new SearchParamsManager("search");
