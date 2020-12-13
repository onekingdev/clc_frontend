export interface IPathsList {
    locked: {
        topic: string,
        lesson: string,
        description: string,
        status: number
    }[],
    available: {
        topic: string,
        lesson: string,
        description: string,
        status: number
    }[],
    mastered: {
        topic: string,
        lesson: string,
        description: string,
        status: number
    }[],
}