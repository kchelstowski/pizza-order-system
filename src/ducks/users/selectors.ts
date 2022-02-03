import {RootStore} from "../RootReducer";
import {User} from "./interfaces";

export const getAllUsers = (state: RootStore) => {
    return state.users.users
}

export const findNameOfClient = (allUsers: User[], login: string) => {
    const client = allUsers.find(user => user.login === login)
    return client ? `${client.firstName} ${client.lastName}` : "unknown"
}
export const getOneUser = (state: RootStore, login: string | undefined) => {
    return state.users.users.find(user => user.login === login)
}