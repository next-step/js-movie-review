import { ERROR_CODE, ERROR_MESSAGE } from "../data/constant";

export default function requestError(error) {
  if (!error.response) {
    return { success: false, error: ERROR_MESSAGE.NETWORK };
  }

  const status = error.response.status;

  let errorMessage = "";

  if (status >= ERROR_CODE.SERVER) {
    errorMessage = ERROR_MESSAGE.SERVER;
  } else if (status >= ERROR_CODE.CLIENT && status < ERROR_CODE.SERVER) {
    errorMessage = ERROR_MESSAGE.CLIENT;
  } else if (error.code === ERROR_CODE.TIMEOUT) {
    errorMessage = ERROR_MESSAGE.TIMEOUT;
  } else {
    errorMessage = ERROR_MESSAGE.TEMPORARY;
  }

  return { success: false, error: errorMessage, status };
}
