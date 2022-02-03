import {Dispatch} from "redux"
import {AxiosError} from "axios"
import {
    ORDER_ADD,
    ORDER_ADD_REQUEST_FAILED, ORDER_CLEAR_ERROR, ORDER_DELETE, ORDER_DELETE_REQUEST_FAILED,
    ORDER_EDIT_STATUS,
    ORDER_EDIT_STATUS_FAILED,
    ORDER_LIST_REQUEST_FAILED,
    ORDER_LIST_REQUEST_START,
    ORDER_LIST_REQUEST_SUCCESS,
    OrdersDispatchTypes
} from "./types";
import {Order, Status} from "./interfaces";
import {
    PRODUCT_DECREMENT_AMOUNT_BY_ONE,
    ProductsDispatchTypes
} from "../products/types";


const axios = require("axios")


export const getOrders = () => async (dispatch: Dispatch<OrdersDispatchTypes>) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST_START
        })
        const res = await axios.get('http://localhost:5000/orders')
        dispatch({
            type: ORDER_LIST_REQUEST_SUCCESS,
            payload: res.data
        })
    } catch (e) {
        const err = e as AxiosError
        dispatch({
            type: ORDER_LIST_REQUEST_FAILED,
            payload: err.response?.data
        })
    }
}

export const addOrder = (order: Order) => async (dispatch: Dispatch<OrdersDispatchTypes | ProductsDispatchTypes>) => {
    try {
        const res = await axios.post('http://localhost:5000/orders', order)
        if (res.status === 200) {
            dispatch({
                type: ORDER_ADD,
                payload: res.data
            })
            res.data.order.forEach((idProduct: string) => {
                dispatch({
                    type: PRODUCT_DECREMENT_AMOUNT_BY_ONE,
                    payload: idProduct
                })
            })
        }
    } catch (e) {
        const err = e as AxiosError
        dispatch({
            type: ORDER_ADD_REQUEST_FAILED,
            payload: err.response?.data.message
        })
    }
}

export const editStatus = (status: Status, id: string) => async (dispatch: Dispatch<OrdersDispatchTypes>) => {
    try {
        const res = await axios.patch(`http://localhost:5000/orders/${id}`, status)

        if (res.status === 200) {
            dispatch({
                type: ORDER_EDIT_STATUS,
                payload: {id: id, status: status.status}
            })
        }
    } catch (e) {
        const err = e as AxiosError
        dispatch({
            type: ORDER_EDIT_STATUS_FAILED,
            payload: err.response?.data
        })
    }
}

export const deleteOrder = (id: string) => async (dispatch: Dispatch<OrdersDispatchTypes>) => {
    try {
        const res = await axios.delete(`http://localhost:5000/orders/${id}`)
        if (res.status === 200) {
            dispatch({
                type: ORDER_DELETE,
                payload: id
            })
        }
    } catch (e) {
        const err = e as AxiosError
        dispatch({
            type: ORDER_DELETE_REQUEST_FAILED,
            payload: err.response?.data
        })
    }
}

