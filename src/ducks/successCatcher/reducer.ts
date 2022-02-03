import {SUCCESS_CLEAR, SuccessDispatchTypes} from "./types";
import {USER_ADD, USER_CHANGE_ROOT_STATUS, USER_EDIT, USER_EDIT_PASSWORD} from "../users/types";
import {PRODUCT_ADD, PRODUCT_EDIT} from "../products/types";
import {ORDER_ADD} from "../orders/types";


export interface SuccessState {
    message: string
}

const successInitState: SuccessState = {
    message: ''
}

export const successReducer = (state: SuccessState = successInitState, action: SuccessDispatchTypes): SuccessState => {
    switch (action.type) {
        case USER_ADD:
            return {...state, message: "You've created an account successfully!"}
        case PRODUCT_ADD:
            return {...state, message: "Product has been added successfully!"}
        case PRODUCT_EDIT:
            return {...state, message: "Product has been successfully updated!"}
        case ORDER_ADD:
            return {...state, message: "Order has been made successfully!"}
        case USER_CHANGE_ROOT_STATUS:
            return {...state, message: "Successfully changed user's root status"}
        case USER_EDIT:
            return {...state, message: "User has been succesfully changed"}
        case USER_EDIT_PASSWORD:
            return {...state, message: "Password has been changed successfully"}
        case SUCCESS_CLEAR:
            return {...state, message: ''}
        default:
            return state
    }
}