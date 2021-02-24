import * as TYPES from './types';
import {app} from '../../../../services/firebase';
import firebase from "firebase";
import moment from 'moment';
import {formatGraphData} from '../../../../helpers/formatter';

export const clearPerformanceData = () => {
    return {
        type: TYPES.CLEAR_PERFORMANCE_DATA
    };
};

export const setPerformanceCode = (data: number) => {
    return {
        type: TYPES.SET_PERFORMANCE_CODE,
        payload: data
    }
}

export const setIsFetchingPerformanceData = (data: boolean) => {
    return {
        type: TYPES.SET_IS_FETCHING_PERFORMANCE_DATA,
        payload: data
    }
}

export const setTableData = (data: object) => {
    return {
        type: TYPES.SET_TABLE_DATA,
        payload: data
    }
}

export const setDailyGraphData = (data: object) => {
    return {
        type: TYPES.SET_DAILY_GRAPH_DATA,
        payload: data
    }
}

export const setMonthlyGraphData = (data: object) => {
    return {
        type: TYPES.SET_MONTHLY_GRAPH_DATA,
        payload: data
    }
}

export const fetchEarnings = (consult: string, tableTime?: string) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    const uid = getState().authState.user.stringID;
    let correctRank = 0, chipRank = 0;

    dispatch(setIsFetchingPerformanceData(true));

    const correct = await app
        .firestore()
        .collection('earnings')
        .orderBy(`${consult}.correct`, 'desc')
        .limit(10)
        .get()
        .then(snapshot => {
            let list: any = [];
            let counter = 1;
            snapshot.forEach((doc: any) => {
                if (doc.id === uid) correctRank = counter;
                list.push({id: doc.id, ...doc.data(), rank: counter ++});
            });
            return list;
        });

    const chips = await app
        .firestore()
        .collection('earnings')
        .orderBy(`${consult}.chips`, 'desc')
        .limit(10)
        .get()
        .then(snapshot => {
            let list: any = [];
            let counter = 1;
            snapshot.forEach(doc => {
                if (doc.id === uid) chipRank = counter;
                list.push({id: doc.id, ...doc.data(), rank: counter ++});
            });
            return list;
        });

    let myChips = 0, myCorrect = 0, myTickets = 0, days = {}, months = {};

    correct.forEach((earning: any) => {
        if (earning.id === uid) {
            myChips = earning[consult].chips;
            myCorrect = earning[consult].correct;
            myTickets = earning[consult].tickets;
            days = earning.days;
            months = earning.months;
        }
    });

    dispatch(setTableData({
        chipsEarned: chips,
        myChipsEarned: myChips,
        correctQuestions: correct,
        myCorrectQuestions: myCorrect,
        myCorrectRank: correctRank,
        myChipRank: chipRank,
        myTickets: myTickets
    }))

    dispatch(setDailyGraphData(formatGraphData(days)))
    dispatch(setMonthlyGraphData(formatGraphData(months)))
    dispatch(setIsFetchingPerformanceData(false))
}

export const updateDailyEarnings = (data: { chips: number, tickets: number }) => async(
    dispatch: (data: any) => void,
    getState: any,
) => {
    // season, week, month, lifetime
    // chips earned, correct questions
    // graph (questions, tickets)
    const uid = getState().authState.user.stringID;

    let date = moment();
    let weekDayName =  moment(date).format('dddd').toLowerCase();
    let weekDayNumber =  moment(date).day();
    let monthNumber =  moment(date).month();

    const dailyUpdate = (day: string, amount?: any) => {
        if (amount) return document.days[day].tickets += amount;
        return document.days[day].correct += 1;
    }

    const daysUpdate = () => {
        switch (weekDayName) {
            case 'monday':
                return {...document.days, monday: {correct: dailyUpdate('monday'), tickets: dailyUpdate('monday', data.tickets)}};
            case 'tuesday':
                return {...document.days, tuesday: {correct: dailyUpdate('tuesday'), tickets: dailyUpdate('tuesday', data.tickets)}};
            case 'wednesday':
                return {...document.days, wednesday: {correct: dailyUpdate('wednesday'), tickets: dailyUpdate('wednesday', data.tickets)}};
            case 'thursday':
                return {...document.days, thursday: {correct: dailyUpdate('thursday'), tickets: dailyUpdate('thursday', data.tickets)}};
            case 'friday':
                return {...document.days, friday: {correct: dailyUpdate('friday'), tickets: dailyUpdate('friday', data.tickets)}};
            case 'saturday':
                return {...document.days, saturday: {correct: dailyUpdate('saturday'), tickets: dailyUpdate('saturday', data.tickets)}};
            default:
                return {...document.days, sunday: {correct: dailyUpdate('sunday'), tickets: dailyUpdate('sunday', data.tickets)}};
        }
    }

    const addToMonth = (month: string, amount?: any) => {
        if (amount) return document.months[month].tickets += amount;
        return document.months[month].correct += 1;
    }

    const monthsUpdate = () => {
        switch (monthNumber) {
            case 0:
                return {...document.months, january: {correct: addToMonth('january'), tickets: addToMonth('january', data.tickets)}};
            case 1:
                return {...document.months, february: {correct: addToMonth('february'), tickets: addToMonth('february', data.tickets)}};
            case 2:
                return {...document.months, march: {correct: addToMonth('march'), tickets: addToMonth('march', data.tickets)}};
            case 3:
                return {...document.months, april: {correct: addToMonth('april'), tickets: addToMonth('april', data.tickets)}};
            case 4:
                return {...document.months, may: {correct: addToMonth('may'), tickets: addToMonth('may', data.tickets)}};
            case 5:
                return {...document.months, june: {correct: addToMonth('june'), tickets: addToMonth('june', data.tickets)}};
            case 6:
                return {...document.months, july: {correct: addToMonth('july'), tickets: addToMonth('july', data.tickets)}};
            case 7:
                return {...document.months, august: {correct: addToMonth('august'), tickets: addToMonth('august', data.tickets)}};
            case 8:
                return {...document.months, september: {correct: addToMonth('september'), tickets: addToMonth('september', data.tickets)}};
            case 9:
                return {...document.months, october: {correct: addToMonth('october'), tickets: addToMonth('october', data.tickets)}};
            case 10:
                return {...document.months, november: {correct: addToMonth('november'), tickets: addToMonth('november', data.tickets)}};
            default:
                return {...document.months, december: {correct: addToMonth('december'), tickets: addToMonth('december', data.tickets)}};
        }
    }

    const weeklyUpdate = (increment: number, field: string) => {
        if ((moment(document.week.started.seconds).day() -1) <= weekDayNumber) return document.week[field] += increment;
        return increment;
    }

    const monthlyUpdate = (increment: number, field: string) => {
        if ((moment(document.season.started.seconds).month() !== 0 ? moment(document.season.started.seconds).month() -1 : 0) === monthNumber) return document.month[field] += increment;
        return increment;
    }

    const seasonUpdate = (increment: number, field: string) => {
        if ((moment(document.season.started.seconds).month() !== 0 ? moment(document.season.started.seconds).month() -1 : 0) <= monthNumber ) return document.season[field] += increment;
        return increment;
    }

    const startDateUpdate = (time: string) => {
        switch (time) {
            case 'season':
                if ((moment(document.season.started.seconds).month() !== 0 ? moment(document.season.started.seconds).month() -1 : 11) <= monthNumber) return document.season.started;
                return date.format("X");
            case 'week':
                if ((moment(document.week.started.seconds).day() -1) <= weekDayNumber) return document.week.started;
                return date.format("X");
            default:
                if ((moment(document.season.started.seconds).month() !== 0 ? moment(document.season.started.seconds).month() -1 : 11) === monthNumber) return document.month.started;
                return date.format("X");
        }
    }

    const document = await app
        .firestore()
        .collection('earnings')
        .doc(uid)
        .get()
        .then((doc: any) => doc.data());

    await app
        .firestore()
        .collection('users')
        .doc(uid)
        .update('chips', firebase.firestore.FieldValue.increment(data.chips));

    await app
        .firestore()
        .collection('users')
        .doc(uid)
        .update('tickets', firebase.firestore.FieldValue.increment(data.tickets));

    await app
        .firestore()
        .collection('earnings')
        .doc(uid)
        .update({
            season: {
                correct: seasonUpdate(1, 'correct'),
                chips: seasonUpdate(data.chips, 'chips'),
                tickets: seasonUpdate(data.tickets, 'tickets'),
                started: startDateUpdate('season')
            },
            week: {
                correct: weeklyUpdate(1, 'correct'),
                chips: weeklyUpdate(data.chips, 'chips'),
                tickets: weeklyUpdate(data.tickets, 'tickets'),
                started: startDateUpdate('week')
            },
            month: {
                correct: monthlyUpdate(1, 'correct'),
                chips: monthlyUpdate(data.chips, 'chips'),
                tickets: monthlyUpdate(data.tickets, 'tickets'),
                started: startDateUpdate('month')
            },
            lifetime: {
                correct: document.lifetime.correct += 1,
                chips: document.lifetime.chips += data.chips,
                tickets: document.lifetime.tickets += data.tickets,
            },
            days: daysUpdate(),
            months: monthsUpdate()
        })
}