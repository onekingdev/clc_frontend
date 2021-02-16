export interface IUser {
    stringID?: string,
    activationCode?: string,
    assessment?: boolean,
    userName?: string,
    password?: string,
    email?: string,
    payment?: {
        id: string,
        amount: number,
        created: number,
        subscription: string
    }
}