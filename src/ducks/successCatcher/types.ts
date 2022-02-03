import {UsersDispatchTypes} from "../users/types";
import {ProductsDispatchTypes} from "../products/types";
import {OrdersDispatchTypes} from "../orders/types";


export const SUCCESS_CLEAR = "SUCCESS_CLEAR"

interface SuccessClear {
    type: typeof SUCCESS_CLEAR
}


export type SuccessDispatchTypes = UsersDispatchTypes | ProductsDispatchTypes | OrdersDispatchTypes | SuccessClear