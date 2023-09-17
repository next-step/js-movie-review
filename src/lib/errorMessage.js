const ERROR_STATUS_CODE = Object.freeze({
	CLIENT: 400,
	SERVER: 500,
});

export function getErrorMessageByStatusCode(statusCode) {
	if (statusCode >= ERROR_STATUS_CODE.SERVER) {
		return '서버 문제가 발생하였습니다. 관리자에게 문의해주세요.';
	}

	if (statusCode >= ERROR_STATUS_CODE.CLIENT) {
		return '앱의 문제가 발생하였습니다. 관리자에게 문의해주세요.';
	}

	return '알 수 없는 에러가 발생하였습니다. 다시 시도해 주세요.';
}
