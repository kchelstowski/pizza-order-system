import {Dispatch} from "redux"
import {AxiosError} from "axios"
import {
    USER_ADD, USER_ADD_REQUEST_FAILED,
    USER_LIST_REQUEST_FAILED,
    USER_LIST_REQUEST_START,
    USER_LIST_REQUEST_SUCCESS,
    USER_CHANGE_ROOT_STATUS,
    UsersDispatchTypes, USER_DELETE, USER_EDIT, USER_EDIT_REQUEST_FAILED, USER_CLEAR_ERROR, USER_EDIT_PASSWORD
} from "./types";
import {User} from "./interfaces";

const axios = require("axios")


export const getUsers = () => async (dispatch: Dispatch<UsersDispatchTypes>) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST_START
        })
        const res = await axios.get('http://localhost:5000/users')
        dispatch({
            type: USER_LIST_REQUEST_SUCCESS,
            payload: res.data
        })
    } catch (e) {
        const err = e as AxiosError
        dispatch({
            type: USER_LIST_REQUEST_FAILED,
            payload: err.response?.data
        })
    }
}

export const addUser = (user: User) => async (dispatch: Dispatch<UsersDispatchTypes>) => {
    try {
        const res = await axios.post('http://localhost:5000/users', user)

        if (res.status === 200) {
            dispatch({
                type: USER_ADD,
                payload: res.data
            })
        }
    } catch (e) {
        const err = e as AxiosError
        dispatch({
            type: USER_ADD_REQUEST_FAILED,
            payload: err.response?.data
        })
    }
}

export const userChangeRootStatus = (login: string, newRootStatus: boolean) => async (dispatch: Dispatch<UsersDispatchTypes>) => {
    try {
        const res = await axios.patch(`http://localhost:5000/users/changeRootStatus/${login}`, {root: newRootStatus})
        if (res.status === 200) {
            dispatch({
                type: USER_CHANGE_ROOT_STATUS,
                payload: {login: login, root: newRootStatus}
            })
        }
    } catch (e) {
        const err = e as AxiosError

    }
}

export const deleteUser = (login: string) => async (dispatch: Dispatch<UsersDispatchTypes>) => {
    try {
        const res = await axios.delete(`http://localhost:5000/users/${login}`)
        if (res.status === 200) {
            dispatch({
                type: USER_DELETE,
                payload: login
            })
        }
    } catch (e) {

    }
}
export const editUser = (user: User) => async (dispatch: Dispatch<UsersDispatchTypes>) => {
    try {
        const res = await axios.put(`http://localhost:5000/users/${user.login}`, user)
        if (res.status === 200) {
            dispatch({
                type: USER_EDIT,
                payload: user
            })
        }
        if (res.status === 201) {
            dispatch({
                type: USER_EDIT_PASSWORD,
                payload: user
            })
        }
    } catch (e) {
        const err = e as AxiosError
        dispatch({
            type: USER_EDIT_REQUEST_FAILED,
            payload: err.response?.data
        })
    }
}
