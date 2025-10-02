const BASE_URL = "https://api.themoviedb.org/3/";

export default class ApiClient {
  static async get(endpoint, headers = {}) {
    return this.request("GET", endpoint, null, headers);
  }

  static async post(endpoint, body, headers = {}) {
    return this.request("POST", endpoint, body, headers);
  }

  static async put(endpoint, body, headers = {}) {
    return this.request("PUT", endpoint, body, headers);
  }

  static async delete(endpoint, headers = {}) {
    return this.request("DELETE", endpoint, null, headers);
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
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
}
