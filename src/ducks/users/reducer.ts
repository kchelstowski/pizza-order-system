import {
    USER_ADD,
    USER_ADD_REQUEST_FAILED,
    USER_CHANGE_ROOT_STATUS, USER_CLEAR_ERROR,
    USER_DELETE,
    USER_EDIT, USER_EDIT_PASSWORD,
    USER_EDIT_REQUEST_FAILED,
    USER_LIST_REQUEST_FAILED,
    USER_LIST_REQUEST_START,
    USER_LIST_REQUEST_SUCCESS,
    UsersDispatchTypes
} from "./types";
import {User} from "./interfaces";

export interface InitStateUsers {
    users: User[],
    loading: boolean,
    error: unknown
}

const initState: InitStateUsers = {
    users: [],
    loading: false,
    error: ''
}

export const UserReducer = (state: InitStateUsers = initState, action: UsersDispatchTypes): InitStateUsers => {
    switch (action.type) {
        case USER_LIST_REQUEST_START:
            return {...state, loading: true}
        case USER_LIST_REQUEST_SUCCESS:
            return {...state, loading: false, users: action.payload}
        case USER_LIST_REQUEST_FAILED:
            return {...state, loading: false, error: action.payload ? action.payload : "Not connected to database"}
        case USER_ADD:
            return {...state, users: [...state.users, action.payload]}
        case USER_ADD_REQUEST_FAILED:
            return {...state, error: action.payload ? action.payload : "Not connected to database"}
        case USER_CHANGE_ROOT_STATUS:
            return {
                ...state, users: state.users.map(user => {
                    if (user.login === action.payload.login) {
                        return {...user, root: action.payload.root}
                    }
                    return user
                })
            }
        case USER_DELETE:
            return {...state, users: state.users.filter(user => user.login !== action.payload)}
        case USER_EDIT:
            return {
                ...state, users: state.users.map(user => {
                    if (user.login === action.payload.login) {
                        return action.payload
                    }
                    return user
                }), error: ''
            }
        case USER_EDIT_PASSWORD:
            return {
                ...state, users: state.users.map(user => {
                    if (user.login === action.payload.login) {
                        return action.payload
                    }
                    return user
                }), error: ''
            }
        case USER_EDIT_REQUEST_FAILED:
            return {...state, error: action.payload}
        case USER_CLEAR_ERROR:
            return {...state, error: ''}
        default:
            return state
    }
}

