const ACCESS_TOKEN = process.env.TMDB_API_ACCESS_TOKEN;
const API_URL = process.env.TMDB_API_URL;

/**
 * API 요청을 보내는 함수입니다.
 * @param {string} url
 * @param {RequestInit} options
 * @returns
 */
const request = async (url, options) => {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      ...options,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const parsedResponse = await response.json();
      throw new Error(parsedResponse.message);
    }
  } catch (err) {
    console.error(`Request Error : ${err}`);
  }
};

export default request;
