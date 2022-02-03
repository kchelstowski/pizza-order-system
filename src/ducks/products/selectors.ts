import {RootStore} from "../RootReducer";
import {Product} from "./interfaces";

export const getAllProducts = (state: RootStore) => {
    return state.products.products
}

export const findNameOfProduct = (allProducts: Product[], id: string) => {
    const product = allProducts.find(product => product.id === id)
    return product ? product.name : "unknown"
}