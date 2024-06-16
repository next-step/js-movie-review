import { BASE_URL } from '../constants/api';
import { APIError } from './error';

class ApiClient {
    static async request({ method, endpoint, params, headers = {}, body = null }) {
        const url = params ? this.createUrlSearchParams(`${BASE_URL}/${endpoint}`, params) : `${BASE_URL}/${endpoint}`;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: body ? JSON.stringify(body) : null
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (!response.ok) {
                throw new APIError(data.status_code, data.status_message);
            }
            return data;
        } catch (error) {
            throw new APIError(400, error.message);
        }
    }

    static createUrlSearchParams(baseUrl, params) {
        const url = new URL(baseUrl);
        url.search = new URLSearchParams(params).toString();
        return url.toString();
    }
}

export default ApiClient;
