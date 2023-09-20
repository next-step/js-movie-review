import axios from 'axios';

class ApiWrapper {
	constructor(baseURL, headers = {}) {
		this.api = axios.create({
			baseURL: baseURL,
			headers,
		});
	}

	async get(endpoint, params = {}, headers = {}) {
		try {
			const response = await this.api.get(endpoint, { params, headers });
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async post(endpoint, payload = {}, headers = {}) {
		try {
			const response = await this.api.post(endpoint, payload, { headers });
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async put(endpoint, payload = {}, headers = {}) {
		try {
			const response = await this.api.put(endpoint, payload, { headers });
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async delete(endpoint, headers = {}) {
		try {
			const response = await this.api.delete(endpoint, { headers });
			return response.data;
		} catch (error) {
			throw error;
		}
	}
}

export const TMDB_BASE_URL = 'https://api.themoviedb.org';

export const tmdbApiWrapper = new ApiWrapper(TMDB_BASE_URL, {
	accept: 'application/json',
	Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
});
