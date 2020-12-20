import {Simulate} from "react-dom/test-utils";

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

