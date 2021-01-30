import ReactTooltip from "react-tooltip";
import React from "react";

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
        case 501:
            return 'Insufficient chips';
        case 502:
            return 'Insufficient tickets';
        case 503:
            return 'Mastered level required';
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

export const embedVideo = (url: string) => {
    let host = url !== '' ? new URL(url).host : '';

    switch (host) {
        case 'player.vimeo.com':
            let playerVimeoID = new URL(url).pathname;
            const newPlayerVimeoID = playerVimeoID.split('/');
            return `https://player.vimeo.com/video/${newPlayerVimeoID[2]}`;
        case 'vimeo.com':
            let vimeoID = new URL(url).pathname;
            return `https://player.vimeo.com/video${vimeoID}`;
        case 'www.youtube.com':
            let youtubeID = new URL(url).searchParams.get("v");
            return `https://www.youtube.com/embed/${youtubeID}`;

    }
    return ''
};

export const parseResponse = (response: string) => {
    if (response[response.length] !== '.' && response[response.length] !== '?' && response[response.length-1] !== '.' && response[response.length-1] !== '?') {
        response += '.';
    }
    const glossary = localStorage.getItem('glossary')
    if (glossary != null) {
        JSON.parse(glossary).forEach((item: any) => {
            if (response.includes(' ' + item.word + ' ' || ',' + item.word + ' ' || '?' + item.word + ' ' || '.' + item.word + ' ' || ';' + item.word + ' ' || ' ' + item.word + ' ' || ' ' + item.word + ',' || ' ' + item.word + '.' || ' ' + item.word + ';' || ' ' + item.word + '?' || ' ' + item.word + 'ed')) {
                response = response.replace(item.word, "<span data-tip='" + item.definition + "' style={{zIndex: 99}} id='keyWord'>" + item.word + "</span>");
            }
        })
    }

    return response;
}