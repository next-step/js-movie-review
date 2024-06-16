import { BASE_URL } from '../constants/api';
import { APIError } from '../apis/error';

interface ApiClientType {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    endpoint: string;
    params?: Record<string, string>;
    headers?: Record<string, string>;
    body?: Record<string, any>;
}

class ApiClient {
    static async request({ method, endpoint, params, headers = {}, body }: ApiClientType) {
        const url = params
            ? this.createUrlSearchParams({ baseUrl: `${BASE_URL}/${endpoint}`, params })
            : `${BASE_URL}/${endpoint}`;

        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            ...(body && { body: JSON.stringify(body) })
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (!response.ok) {
                throw new APIError(data.status_code, data.status_message);
            }
            return data;
        } catch (error: any) {
            throw new APIError(400, error.message || 'An unknown error occurred');
        }
    }

    static createUrlSearchParams({ baseUrl, params }: { baseUrl: string; params: Record<string, string> }) {
        const url = new URL(baseUrl);
        url.search = new URLSearchParams(params).toString();
        return url.toString();
    }
}

export default ApiClient;
