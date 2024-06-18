export const BASE_URL = "https://api.themoviedb.org/3/movie/popular";

export const ERROR_MSG = {
  INVALID_API_KEY: { 
    message: "API키가 유효하지 않습니다.", 
    details: "API키를 확인하신 후 다시 시도해주세요."
  },
  INVALID_REQUEST: {
    message: "요청이 올바르지 않습니다.",
    details: "API 요청 URL을 확인해주세요."
  },
  DEFAULT: {
    message: "알 수 없는 오류가 발생했습니다.",
    details: "잠시 후 다시 시도해주세요."
  },
};
