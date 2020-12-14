import axios from 'axios';
import {apiProductionUrl, apiDevelopmentUrl} from '../helpers/constants';

const getApi = () => {
    /*let parts = window.location.hostname.split('.');
    let subDomain = parts.slice(-2).join('.');
    if (subDomain === 'dev') return apiDevelopmentUrl;
    return apiProductionUrl;*/

    return apiDevelopmentUrl;
}

const api = {
    get: async (path: string) =>
        await axios.get(`${getApi()}/${path}`,{headers: {
                'Content-Type': 'application/json',
            }})
            .then((res: any) => res.data)
            .catch(error => error),
    post: async (path: string, data: any) =>
        await axios.post(`${getApi()}/${path}`, data, {headers: {
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