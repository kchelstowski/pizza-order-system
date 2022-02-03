import {
    ORDER_ADD, ORDER_ADD_REQUEST_FAILED, ORDER_CLEAR_ERROR, ORDER_DELETE, ORDER_DELETE_REQUEST_FAILED,
    ORDER_EDIT_STATUS,
    ORDER_LIST_REQUEST_FAILED,
    ORDER_LIST_REQUEST_START,
    ORDER_LIST_REQUEST_SUCCESS,
    OrdersDispatchTypes
} from "./types";
import {Order} from "./interfaces";


export interface StateOrders {
    orders: Order[],
    loading: boolean,
    error: any
}

const initState: StateOrders = {
    orders: [],
    loading: false,
    error: ''
}

export const OrderReducer = (state: StateOrders = initState, action: OrdersDispatchTypes): StateOrders => {
    switch (action.type) {
        case ORDER_LIST_REQUEST_START:
            return {...state, loading: true}
        case ORDER_LIST_REQUEST_SUCCESS:
            return {...state, loading: false, orders: action.payload}
        case ORDER_LIST_REQUEST_FAILED:
            return {...state, loading: false, error: action.payload ? action.payload : "Not connected to database"}
        case ORDER_ADD:
            return {...state, orders: [...state.orders, action.payload]}
        case ORDER_ADD_REQUEST_FAILED:
            return {...state, error: action.payload ? action.payload : "Not connected to database"}
        case ORDER_EDIT_STATUS:
            return {
                ...state, orders: state.orders.map(order => {
                    if (order.id === action.payload.id) {
                        return {...order, status: action.payload.status}
                    }
                    return order
                })
            }
        case ORDER_DELETE:
            return {...state, orders: state.orders.filter(order => order.id !== action.payload)}
        case ORDER_DELETE_REQUEST_FAILED:
            return {...state, error: action.payload}
        case ORDER_CLEAR_ERROR:
            return {...state, error: ''}
        default:
            return state
    }
}

