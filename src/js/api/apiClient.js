import { ApiError } from "./apiError";

export const apiClient = {
  get: async (url, headers = {}) => {
    return apiClient.request("GET", url, null, headers);
  },

  request: async (method, url, body = null, headers = {}) => {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body && JSON.stringify(body),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new ApiError(response.status);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        ApiError.handle(error);
      } else {
        throw error;
      }
    }
  },
};
