import axios from 'axios';
import {apiCloudHostUrl, apiLocalhostUrl, apiStagingHostUrl} from '../helpers/constants';
const staging = false;

const getApi = () => {
    /*let parts = window.location.hostname.split('.');
    let subDomain = parts.slice(-2).join('.');*/
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        return apiLocalhostUrl;
    } else if (staging) {
        return apiStagingHostUrl;
    }

    return apiCloudHostUrl;
}

const api = {
    get: async (path: string) =>
        await axios.get(`${getApi()}/${path}`,{headers: {
                'Content-Type': 'application/json',
            }})
            .then((res: any) => res.data)
            .catch(error => error),
    post: async (path: string, data: any, headers?: object) =>
        await axios.post(`${getApi()}/${path}`, data, headers ? headers : {headers: {
                'Content-Type': 'application/json',
            }})
            .then((res: any) => res.data)
            .catch(error => error),
    put: async (path: string, data: any) =>
        await axios.put(`${getApi()}/${path}`, data, {headers: {
                'Content-Type': 'application/json',
            }})
            .then((res: any) => res.data)
            .catch(error => error),
}

export default api;