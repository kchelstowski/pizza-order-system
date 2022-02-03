import {combineReducers} from "redux"
import {UserReducer} from "./users/reducer";
import {ProductsReducer} from "./products/reducer";
import {OrderReducer} from "./orders/reducer";
import {successReducer} from "./successCatcher/reducer";

const RootReducer = combineReducers({
    users: UserReducer,
    products: ProductsReducer,
    orders: OrderReducer,
    success: successReducer
})
export type RootStore = ReturnType<typeof RootReducer>

export default RootReducer