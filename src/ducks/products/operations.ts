import {Dispatch} from "redux"
import {AxiosError} from "axios"
import {
    PRODUCT_ADD,
    PRODUCT_ADD_REQUEST_FAILED,
    PRODUCT_CLEAR_ERROR,
    PRODUCT_DELETE, PRODUCT_DELETE_REQUEST_FAILED,
    PRODUCT_EDIT,
    PRODUCT_EDIT_REQUEST_FAILED,
    PRODUCT_LIST_REQUEST_FAILED,
    PRODUCT_LIST_REQUEST_START,
    PRODUCT_LIST_REQUEST_SUCCESS,
    ProductsDispatchTypes
} from "./types";
import {Product} from "./interfaces";


const axios = require("axios")


export const getProducts = () => async (dispatch: Dispatch<ProductsDispatchTypes>) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST_START
        })
        const res = await axios.get('http://localhost:5000/products')
        dispatch({
            type: PRODUCT_LIST_REQUEST_SUCCESS,
            payload: res.data
        })
    } catch (e) {
        const err = e as AxiosError
        dispatch({
            type: PRODUCT_LIST_REQUEST_FAILED,
            payload: err.response?.data
        })
    }
}

export const addProduct = (product: Product) => async (dispatch: Dispatch<ProductsDispatchTypes>) => {
    try {
        const res = await axios.post('http://localhost:5000/products', product)

        if (res.status === 200) {
            dispatch({
                type: PRODUCT_ADD,
                payload: res.data
            })
        }
    } catch (e) {
        const err = e as AxiosError
        dispatch({
            type: PRODUCT_ADD_REQUEST_FAILED,
            payload: err.response?.data.message
        })
    }
}

export const editProduct = (product: Product) => async (dispatch: Dispatch<ProductsDispatchTypes>) => {
    try {
        const res = await axios.put(`http://localhost:5000/products/${product.id}`, product)
        if (res.status === 200) {
            dispatch({
                type: PRODUCT_EDIT,
                payload: product
            })
        }

    } catch (e) {
        const err = e as AxiosError
        dispatch({
            type: PRODUCT_EDIT_REQUEST_FAILED,
            payload: err.response?.data
        })
    }
}
export const productDelete = (id: string) => async (dispatch: Dispatch<ProductsDispatchTypes>) => {
    try {
        const res = await axios.delete(`http://localhost:5000/products/${id}`)
        if (res.status === 200) {
            dispatch({
                type: PRODUCT_DELETE,
                payload: id
            })
        }
    } catch (e) {
        const err = e as AxiosError
        dispatch({
            type: PRODUCT_DELETE_REQUEST_FAILED,
            payload: err.response?.data
        })
    }
}

