import axios from "axios";

export const getMovieData = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.TMDB_API_BASE_URL}&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_ACCESS_TOKEN}`,
          Accept: "application/json",
        },
        timeout: 5000,
      }
    );

    return { success: true, data };
  } catch (error) {
    if (!error.response) {
      return { success: false, error: "네트워크 에러입니다" };
    }

    const status = error.response.status;

    if (status >= 500) {
      return { success: false, error: "서버 에러입니다", status };
    }

    if (status >= 400 && status < 500) {
      return {
        success: false,
        error: "요청 오류입니다.",
        status,
      };
    }

    if (error.code === "ECONNABORTED") {
      return { success: false, error: "타임아웃 오류입니다", status };
    }

    return {
      success: false,
      error: "일시적인 오류입니다 다시 시도해주세요",
      status,
    };
  }
};
