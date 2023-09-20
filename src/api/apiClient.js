import axios from 'axios';
import _ from 'lodash';

class ApiWrapper {
	constructor(baseURL, config = {}) {
		this.api = axios.create({
			baseURL: baseURL,
			...config,
		});
	}

	async get(endpoint, config) {
		try {
			const response = await this.api.get(endpoint, config);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async post(endpoint, payload = {}, config) {
		try {
			const response = await this.api.post(endpoint, payload, config);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async put(endpoint, payload = {}, config) {
		try {
			const response = await this.api.put(endpoint, payload, config);
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
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
	},
});
