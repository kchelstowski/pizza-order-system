export interface User {
    login: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    gender: string,
    root?: boolean
}

export interface UserIdWithRootStatus {
    login: string,
    root: boolean
}