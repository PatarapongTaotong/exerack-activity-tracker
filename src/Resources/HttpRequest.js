import axios from "axios";
import humps from 'humps';

class HttpRequest {
    constructor (endpoint = process.env.REACT_APP_API) {
        this.axiosInstance = axios.create({
            baseURL: endpoint,
            timeout: 120000,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        this.axiosInstance.interceptors.request.use((config) => {
            const myConfig = config;
            myConfig.data = config.data ? humps.decamelizeKeys(config.data) : config.data;
            myConfig.params = config.params ? humps.decamelizeKeys(config.params) : config.params;
            return myConfig;
        })

        this.axiosInstance.interceptors.response.use((response) => {
            const newResponse = response;
            newResponse.data = humps.camelizeKeys(response.data);
            return newResponse.data;
        }, (error) => {
            const newError = new Error(error);
            if (error?.response?.data) {
                return Promise.reject(error.response.data);
            }

            const errorFail = {
                code: 503,
                message: newError.message
            }

            return errorFail;
        })
    }

    setHeader (header) {
        this.axiosInstance.defaults.headers.common[header.key] =header.value;
        this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    get (endpoint, data, config) {
        const params = {
            params: data
        }

        const newParams = Object.assign(params, config);
        return this.axiosInstance.get(endpoint, newParams);
    }

    post (endpoint, data, config) {
        return this.axiosInstance.post(endpoint, data, config);
    }

    put (endpoint, data, config) {
        return this.axiosInstance.put(endpoint, data, config);
    }

    patch (endpoint, data, config) {
        return this.axiosInstance.patch(endpoint, data, config);
    }

    remove (endpoint, data, config) {
        const params = { data };
        const newParams = Object.assign(params, config);
        return this.axiosInstance.delete(endpoint, newParams);
    }

    delete (endpoint, id, config) {
        const params = {
            params: { id }
        }

        const newParams = Object.assign(params, config);
        return this.axiosInstance.delete(endpoint, newParams);
    }
}

export default HttpRequest;