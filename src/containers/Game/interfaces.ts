export interface IPlayers {
    player: number,
    cardOne: {value: string, type: string, show: boolean},
    cardTwo: {value: string, type: string, show: boolean}
}

export interface IFlop {
    cardOne: {value: string, type: string, show: boolean},
    cardTwo: {value: string, type: string, show: boolean},
    cardThree: {value: string, type: string, show: boolean},
    cardFour: {value: string, type: string, show: boolean}
}

export interface IQuestions {
    headerText: string
    questionNumber: number
    description: string
    options: {text: string, correct: boolean}[]
    explanation: string
}