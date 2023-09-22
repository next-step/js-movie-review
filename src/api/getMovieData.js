import { axiosInstance } from "./axiosInstance";

import requestError from "./requestError";

export const getMovieData = async (page) => {
  try {
    const { data } = await axiosInstance.get(`&page=${page}`);
    return { success: true, data };
  } catch (error) {
    return requestError(error);
  }
};
