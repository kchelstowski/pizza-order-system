import {Order, OrderWithStatus} from "./interfaces";

export const ORDER_ADD = 'ORDER_ADD'
export const ORDER_ADD_REQUEST_FAILED = 'ORDER_ADD_REQUEST_FAILED'
export const ORDER_LIST_REQUEST_START = 'ORDER_LIST_REQUEST_START'
export const ORDER_LIST_REQUEST_FAILED = 'ORDER_LIST_REQUEST_FAILED'
export const ORDER_LIST_REQUEST_SUCCESS = 'ORDER_LIST_REQUEST_SUCCESS'
export const ORDER_EDIT_STATUS = 'ORDER_EDIT_STATUS'
export const ORDER_EDIT_STATUS_FAILED = 'ORDER_EDIT_STATUS_FAILED'
export const ORDER_CLEAR_ERROR = 'ORDER_CLEAR_ERROR'
export const ORDER_DELETE = 'ORDER_DELETE'
export const ORDER_DELETE_REQUEST_FAILED = 'ORDER_DELETE_REQUEST_FAILED'

interface OrdersListLoading {
    type: typeof ORDER_LIST_REQUEST_START
}

interface OrdersListSuccess {
    type: typeof ORDER_LIST_REQUEST_SUCCESS,
    payload: Order[]
}

interface OrdersListFailed {
    type: typeof ORDER_LIST_REQUEST_FAILED,
    payload: unknown
}

interface OrderAdd {
    type: typeof ORDER_ADD,
    payload: Order
}

interface OrderAddFailed {
    type: typeof ORDER_ADD_REQUEST_FAILED,
    payload: unknown
}

interface OrderEditStatus {
    type: typeof ORDER_EDIT_STATUS,
    payload: OrderWithStatus
}

interface OrderEditStatusFailed {
    type: typeof ORDER_EDIT_STATUS_FAILED,
    payload: unknown
}

interface OrderClearError {
    type: typeof ORDER_CLEAR_ERROR
}

interface OrderDelete {
    type: typeof ORDER_DELETE,
    payload: string
}

interface OrderDeleteFailed {
    type: typeof ORDER_DELETE_REQUEST_FAILED,
    payload: string
}

export type OrdersDispatchTypes = OrdersListLoading | OrdersListSuccess | OrdersListFailed
    | OrderAdd | OrderEditStatus | OrderAddFailed | OrderEditStatusFailed | OrderClearError
    | OrderDelete | OrderDeleteFailed