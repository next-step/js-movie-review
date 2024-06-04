import { BASE_URL } from '../constants/api';
import { APIError } from './error';
import { createUrlSeacrhParams } from './utils/createUrlSeachParams';

class ApiClient {
    static async request(method, endpoint, params, headers = {}, body = null) {
        const url = params ? createUrlSeacrhParams(`${BASE_URL}/${endpoint}`, params) : `${BASE_URL}/${endpoint}`;

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
            const data = response.json();

            if (!response.ok) {
                throw new APIError(data.status_code, data.status_message);
            }
        } catch (error) {
            throw error;
        }
    }
}

export default ApiClient;
