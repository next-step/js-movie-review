export const ERROR_MESSAGE = Object.freeze({
  SERVER: "서버 통신 에러입니다.",
  CLIENT: "클라이언트 요청 오류입니다.",
  TIMEOUT: "요청 시간이 지났습니다. 다시 시도해주세요.",
  TEMPORARY: "일시적인 오류입니다. 다시 시도해주세요.",
  NETWORK: "네트워크 에러입니다.",
});

export const ERROR_CODE = Object.freeze({
  SERVER: 500,
  CLIENT: 400,
  TIMEOUT: "ECONNABORTED",
});
