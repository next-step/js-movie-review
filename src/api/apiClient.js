import axios from 'axios';

export class ApiWrapper {
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
