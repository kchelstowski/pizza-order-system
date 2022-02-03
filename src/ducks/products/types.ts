import {Product} from "./interfaces";


export const PRODUCT_ADD = 'PRODUCT_ADD'
export const PRODUCT_ADD_REQUEST_FAILED = 'PRODUCT_ADD_REQUEST_FAILED'
export const PRODUCT_EDIT = 'PRODUCT_EDIT'
export const PRODUCT_EDIT_REQUEST_FAILED = 'PRODUCT_EDIT_REQUEST_FAILED'
export const PRODUCT_LIST_REQUEST_START = 'PRODUCT_LIST_REQUEST_START'
export const PRODUCT_LIST_REQUEST_FAILED = 'PRODUCT_LIST_REQUEST_FAILED'
export const PRODUCT_LIST_REQUEST_SUCCESS = 'PRODUCT_LIST_REQUEST_SUCCESS'
export const PRODUCT_DECREMENT_AMOUNT_BY_ONE = 'PRODUCT_DECREMENT_AMOUNT_BY_ONE'
export const PRODUCT_CLEAR_ERROR = 'PRODUCT_CLEAR_ERROR'
export const PRODUCT_DELETE = 'PRODUCT_DELETE'
export const PRODUCT_DELETE_REQUEST_FAILED = 'PRODUCT_DELETE_REQUEST_FAILED'

interface ProductsListLoading {
    type: typeof PRODUCT_LIST_REQUEST_START
}

interface ProductsListSuccess {
    type: typeof PRODUCT_LIST_REQUEST_SUCCESS,
    payload: Product[]
}

interface ProductsListFailed {
    type: typeof PRODUCT_LIST_REQUEST_FAILED,
    payload: unknown
}

interface ProductAdd {
    type: typeof PRODUCT_ADD,
    payload: Product
}

interface ProductAddFailed {
    type: typeof PRODUCT_ADD_REQUEST_FAILED,
    payload: unknown
}

interface ProductEdit {
    type: typeof PRODUCT_EDIT,
    payload: Product
}

interface ProductEditFailed {
    type: typeof PRODUCT_EDIT_REQUEST_FAILED,
    payload: unknown
}

interface ProductDecrementAmountByOne {
    type: typeof PRODUCT_DECREMENT_AMOUNT_BY_ONE,
    payload: string
}

interface ProductClearError {
    type: typeof PRODUCT_CLEAR_ERROR
}

interface ProductDelete {
    type: typeof PRODUCT_DELETE,
    payload: string
}

interface ProductDeleteFailed {
    type: typeof PRODUCT_DELETE_REQUEST_FAILED,
    payload: unknown
}


export type ProductsDispatchTypes = ProductsListLoading | ProductsListSuccess
    | ProductsListFailed | ProductAdd | ProductDecrementAmountByOne | ProductAddFailed |
    ProductEdit | ProductEditFailed | ProductClearError | ProductDelete | ProductDeleteFailed
