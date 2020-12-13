import {apiProductionUrl, apiDevelopmentUrl} from '../helpers/constants';

const getApi = () => {
    let parts = window.location.hostname.split('.');
    let subDomain = parts.slice(-2).join('.');
    if (subDomain === 'dev') return apiDevelopmentUrl;
    return apiProductionUrl;
}
const api = async (path: string, method: string, data: any) =>
    await fetch(`${getApi()}/${path}`,{
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)})
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => error)

export default api;