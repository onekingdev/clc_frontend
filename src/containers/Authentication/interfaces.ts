export interface IUser {
    stringID?: string,
    activationCode?: string,
    assessment?: boolean,
    userName?: string,
    password?: string,
    email?: string,
    referEmail?: string,
    payment?: {
        customerID: string,
        id: string,
        amount: number,
        created: number,
        subscription: string,
        price?: number,
        paymentMethod: {
            id: string,
            brand: string,
            expMonth: string,
            expYear: string,
            last4: string
        }
    },
    dailyChallenge?: {questions: number, counter: number, lastUpdate: string}
}