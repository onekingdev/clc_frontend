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
            case 'saturday':
                list[6] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
            case 'january':
                list[0] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
            case 'february':
                list[1] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
            case 'march':
                list[2] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
            case 'april':
                list[3] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
            case 'may':
                list[4] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
            case 'june':
                list[5] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
            case 'july':
                list[6] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
            case 'august':
                list[7] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
            case 'september':
                list[8] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
            case 'october':
                list[9] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
            case 'november':
                list[10] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
                break;
            case 'december':
                list[11] = {"name": key, "Questions Correct": values[index].correct, "Tickets Earned": values[index].tickets}
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

const spanWord = (word:string,definition:string) => {
   return `<a class="tooltip">${word}
                <span>${definition}</span>
            </a>`
}

export const parseResponse = (response: string) => {
    if (response[response.length] !== '.' && response[response.length] !== '?' && response[response.length-1] !== '.' && response[response.length-1] !== '?') {
        response += '.';
    }
    const glossary = localStorage.getItem('glossary')
    if (glossary != null) {
        const responseParser = JSON.parse(glossary)
      
        responseParser.forEach((item: any) => {
            if (response.includes(' ' + item.word + ' ' || ',' + item.word + ' ' || '?' + item.word + ' ' || '.' + item.word + ' ' || ';' + item.word + ' ' || ' ' + item.word + ' ' || ' ' + item.word + ',' || ' ' + item.word + '.' || ' ' + item.word + ';' || ' ' + item.word + '?' || ' ' + item.word + 'ed')) {
                response = response.replace(item.word,spanWord(item.word, item.definition));
            }
           
        })
    }
   
    return response;
} 

export const UTGLabeling = (dealer: number, players: any) => {
    const totalPlayers = players.length;
    let dealerIndex = 0;
    let labels = [''];
    let playerLabels = [''];
    switch (totalPlayers) {
        case 2:
            labels = ['BTN', 'BB'];
            playerLabels = ['BTN', 'BB'];
            break;
        case 3:
            labels = ['BTN', 'SB', 'BB'];
            playerLabels = ['BTN', 'SB', 'BB'];
            break;
        case 4:
            labels = ['BTN', 'SB', 'BB', 'CO'];
            playerLabels = ['BTN', 'SB', 'BB', 'CO'];
            break;
        case 5:
            labels = ['BTN', 'SB', 'BB', 'UTG', 'CO'];
            playerLabels = ['BTN', 'SB', 'BB', 'UTG', 'CO'];
            break;
        case 6:
            labels = ['BTN', 'SB', 'BB', 'UTG', 'HJ', 'CO'];
            playerLabels = ['BTN', 'SB', 'BB', 'UTG', 'HJ', 'CO'];
            break;
        case 7:
            labels = ['BTN', 'SB', 'BB', 'UTG', 'MP', 'HJ', 'CO'];
            playerLabels = ['BTN', 'SB', 'BB', 'UTG', 'MP', 'HJ', 'CO'];
            break;
        case 8:
            labels = ['BTN', 'SB', 'BB', 'UTG', 'UTG+1', 'MP', 'HJ', 'CO'];
            playerLabels = ['BTN', 'SB', 'BB', 'UTG', 'UTG+1', 'MP', 'HJ', 'CO'];
            break;
        case 9:
            labels = ['BTN', 'SB', 'BB', 'UTG', 'UTG+1', 'MP', 'MP+1', 'HJ', 'CO'];
            playerLabels = ['BTN', 'SB', 'BB', 'UTG', 'UTG+1', 'MP', 'MP+1', 'HJ', 'CO'];
            break;
    }

    players.forEach((player: any, index: number) => {
        if (parseInt(player.number) === dealer) {
            dealerIndex = index;
        }
    });

    players.forEach((player: any, index: number) => {
        if (index === dealerIndex) playerLabels[index] = labels[0];
        else if (index === dealerIndex+1 || index === (dealerIndex+1)-totalPlayers) playerLabels[index] = labels[1];
        else if (index === dealerIndex+2 || index === (dealerIndex+2)-totalPlayers) playerLabels[index] = labels[2];
        else if (index === dealerIndex+3 || index === (dealerIndex+3)-totalPlayers) playerLabels[index] = labels[3];
        else if (index === dealerIndex+4 || index === (dealerIndex+4)-totalPlayers) playerLabels[index] = labels[4];
        else if (index === dealerIndex+5 || index === (dealerIndex+5)-totalPlayers) playerLabels[index] = labels[5];
        else if (index === dealerIndex+6 || index === (dealerIndex+6)-totalPlayers) playerLabels[index] = labels[6];
        else if (index === dealerIndex+7 || index === (dealerIndex+7)-totalPlayers) playerLabels[index] = labels[7];
        else if (index === dealerIndex+8 || dealerIndex+8 > totalPlayers && index === (dealerIndex+8)-totalPlayers) playerLabels[index] = labels[8];
    });

    return playerLabels;
}

export const getPercentage = (nominator: number, denominator: number) => {
    return nominator/denominator*100;
}