import {
    PRODUCT_ADD,
    PRODUCT_ADD_REQUEST_FAILED,
    PRODUCT_CLEAR_ERROR,
    PRODUCT_DECREMENT_AMOUNT_BY_ONE,
    PRODUCT_DELETE,
    PRODUCT_DELETE_REQUEST_FAILED,
    PRODUCT_EDIT,
    PRODUCT_EDIT_REQUEST_FAILED,
    PRODUCT_LIST_REQUEST_FAILED,
    PRODUCT_LIST_REQUEST_START,
    PRODUCT_LIST_REQUEST_SUCCESS,
    ProductsDispatchTypes
} from "./types";
import {Product} from "./interfaces";

export interface StateProducts {
    products: Product[],
    loading: boolean,
    error: any
}

const initState: StateProducts = {
    products: [],
    loading: false,
    error: ''
}

export const ProductsReducer = (state: StateProducts = initState, action: ProductsDispatchTypes): StateProducts => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST_START:
            return {...state, loading: true}
        case PRODUCT_LIST_REQUEST_SUCCESS:
            return {...state, error: '', loading: false, products: action.payload}
        case PRODUCT_LIST_REQUEST_FAILED:
            return {...state, loading: false, error: action.payload ? action.payload : "Not connected to database"}
        case PRODUCT_ADD:
            return {...state, error: '', products: [...state.products, action.payload]}
        case PRODUCT_ADD_REQUEST_FAILED:
            return {...state, error: action.payload ? action.payload : "Not connected to database"}
        case PRODUCT_DECREMENT_AMOUNT_BY_ONE:
            return {
                ...state, error: '', products: state.products.map(product => {
                    if (product.id === action.payload) {
                        return {...product, amount: product.amount - 1}
                    }
                    return product
                })
            }
        case PRODUCT_EDIT:
            return {
                ...state, error: '', products: state.products.map(product => {
                    if (product.id === action.payload.id) {
                        return action.payload
                    }
                    return product
                })
            }
        case PRODUCT_EDIT_REQUEST_FAILED:
            return {...state, error: action.payload}
        case PRODUCT_CLEAR_ERROR:
            return {...state, error: ''}
        case PRODUCT_DELETE:
            return {...state, products: state.products.filter(product => product.id !== action.payload)}
        case PRODUCT_DELETE_REQUEST_FAILED:
            return {...state, error: action.payload}
        default:
            return state
    }
}

