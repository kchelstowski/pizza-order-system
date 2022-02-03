import {User, UserIdWithRootStatus} from "./interfaces";


export const USER_ADD = 'USER_ADD'
export const USER_ADD_REQUEST_FAILED = 'USER_ADD_REQUEST_FAILED'
export const USER_LIST_REQUEST_START = 'USER_LIST_REQUEST_START'
export const USER_LIST_REQUEST_FAILED = 'USER_LIST_REQUEST_FAILED'
export const USER_LIST_REQUEST_SUCCESS = 'USER_LIST_REQUEST_SUCCESS'
export const USER_CHANGE_ROOT_STATUS = 'USER_CHANGE_ROOT_STATUS'
export const USER_DELETE = 'USER_DELETE'
export const USER_EDIT = 'USER_EDIT'
export const USER_EDIT_REQUEST_FAILED = 'USER_EDIT_REQUEST_FAILED'
export const USER_CLEAR_ERROR = 'USER_CLEAR_ERROR'
export const USER_EDIT_PASSWORD = 'USER_EDIT_PASSWORD'

interface UsersListLoading {
    type: typeof USER_LIST_REQUEST_START
}

interface UsersListSuccess {
    type: typeof USER_LIST_REQUEST_SUCCESS,
    payload: User[]
}

interface UsersListFailed {
    type: typeof USER_LIST_REQUEST_FAILED,
    payload: unknown
}

interface UserAdd {
    type: typeof USER_ADD,
    payload: User
}

interface UserAddFailed {
    type: typeof USER_ADD_REQUEST_FAILED,
    payload: unknown
}

interface UserChangeRootStatus {
    type: typeof USER_CHANGE_ROOT_STATUS,
    payload: UserIdWithRootStatus
}

interface UserDelete {
    type: typeof USER_DELETE,
    payload: string
}

interface UserEdit {
    type: typeof USER_EDIT,
    payload: User
}

interface UserEditFailed {
    type: typeof USER_EDIT_REQUEST_FAILED,
    payload: unknown
}

interface UserClearError {
    type: typeof USER_CLEAR_ERROR
}

interface UserEditPassword {
    type: typeof USER_EDIT_PASSWORD
    payload: User
}


export type UsersDispatchTypes = UsersListLoading | UsersListSuccess
    | UsersListFailed | UserAdd | UserAddFailed | UserChangeRootStatus | UserDelete | UserEdit | UserEditFailed
    | UserClearError | UserEditPassword