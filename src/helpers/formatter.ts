import {Simulate} from "react-dom/test-utils";
import axios from "axios";

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX',  {
        style: 'currency',
        currency: 'MXN',
    }).format(price);
}

export const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatMessageCode = (code: any) => {
    switch (code) {
        case 400:
            return 'Not found';
        case 401:
            return 'Email / Password incorrect';
        case 402:
            return 'Email not found';
        case 403:
            return 'Activation code incorrect';
        default:
            return `${code.substring(0, 58)}...`;
    }
}

export const formatGraphData = (data: any) => {
    const list: any = [];
    const keys: string[] = Object.keys(data);
    const values: { correct: number, tickets: number }[] = Object.values(data);

    keys.forEach((key: string, index) => {
        switch (key) {
            case 'sunday':
                list[0] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
            case 'monday':
                list[1] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
            case 'tuesday':
                list[2] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
            case 'wednesday':
                list[3] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
            case 'thursday':
                list[4] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
            case 'friday':
                list[5] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
            default:
                list[6] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
        }
    })

    return list;
}

export const vimeoDataExtractor = async (url: string) => {
    // https://vimeo.com/253989945
    // http://vimeo.com/api/v2/video/253989945.json
    let path = new URL(url).pathname.substr(1, new URL(url).pathname.length);

    return await axios.get(`http://vimeo.com/api/v2/video/${path}.json`,{headers: {
            'Content-Type': 'application/json',
        }})
        .then((res: any) => {
            let data = {
                description: res.data[0].description,
                thumbnail: res.data[0].thumbnail_large,
                duration: res.data[0].duration,
            }
            return data;
        })
        .catch(error => error)
}
