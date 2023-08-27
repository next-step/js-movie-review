const ACCESS_TOKEN = process.env.TMDB_API_ACCESS_TOKEN;
const API_URL = process.env.TMDB_API_URL;

const request = async (url, options) => {
  let isLoading = true;
  let data = null;
  let isError = false;
  let isCompleted = false;

  const response = await fetch(`${API_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    ...options,
  });

  if (response.ok) {
    isLoading = false;
    isCompleted = true;
    data = await response.json();
  }

  if (!response.ok) {
    isError = true;
  }

  return {
    isLoading,
    data,
    isError,
  };
};

export default request;
