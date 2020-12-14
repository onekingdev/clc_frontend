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
        fetch(`${getApi()}/${path}`, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => data)
            .catch((error) => error),
    post: async (path: string, data: any) =>
        await fetch(`${getApi()}/${path}`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Content-Length": JSON.stringify(data).length.toString()
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => data)
            .catch((error) => error),
    put: async (path: string, data: any) =>
        await fetch(`${getApi()}/${path}`, {
            method: 'PUT',
            mode: 'no-cors',
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Content-Length": JSON.stringify(data).length.toString()
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => data)
            .catch((error) => error)
}

export default api;