import { ApiError, UnauthorizedError, InternetServerError } from "./error";

const BASE_URL = "https://api.themoviedb.org/3/movie";

export default class ApiClient {
  static async get(endpoint, headers = {}) {
    return this.request("GET", endpoint, null, headers);
  }

  static async request(method, endpoint, body = null, headers = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        switch (response.status) {
          case 401:
            throw new UnauthorizedError("Unauthorized access");
          default:
            throw new ApiError(response.status, "An error occurred");
        }
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (error instanceof Response) {
        throw new InternetServerError(error.message || "Server error");
      }

      throw error;
    }
  }
}
