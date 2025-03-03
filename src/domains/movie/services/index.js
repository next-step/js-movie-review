const movieApi = (url, options) => {
  const _options = {
    ...options,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      accept: 'application/json',
    },
  };
  const _url = 'https://api.themoviedb.org' + url;

  return fetch(_url, _options);
};

export const getPopularMovie = async (params) => {
  const { page } = params;

  try {
    const response = await movieApi(
      `/3/discover/movie?include_adult=false&include_video=false&language=ko&region=kr&sort_by=popularity.desc&page=${page ?? 1}`,
      { method: 'GET' },
    );
    const data = await response.json();

    if (!response.ok) {
      if (data.status_code === 22) {
        throw new Error('현재 페이지를 찾을 수 없습니다.');
      }
    }

    return data;
  } catch (error) {
    throw error;
  }
};
