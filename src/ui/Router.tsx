import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import UsersList from "./users/UsersList";
import ProductsList from "./products/ProductsList";
import UsersForm from "./users/UsersForm";
import ProductsForm from "./products/ProductsForm";
import OrdersForm from "./orders/OrdersForm";
import OrdersList from "./orders/OrdersList"
import Login from "./dashboard/Login";
import {RootStore} from "../ducks/RootReducer";
import {connect} from "react-redux";
import {getUsers} from "../ducks/users/operations";
import {getOrders} from "../ducks/orders/operations";
import {getProducts} from "../ducks/products/operations";
import {getAllUsers} from "../ducks/users/selectors";
import {getAllProducts} from "../ducks/products/selectors";
import {User} from "../ducks/users/interfaces";
import {Product} from "../ducks/products/interfaces";
import {Order} from "../ducks/orders/interfaces";
import OrdersListOfUser from "./orders/OrdersListOfUser";
import Main from "./dashboard/Main";
import OrdersStats from "./orders/OrdersStats";

interface RouterProps {
    getUsers: () => void,
    getProducts: () => void,
    getOrders: () => void,
    users: User[],
    products: Product[],
    orders: Order[]
}

const Router = ({getUsers, getProducts, getOrders, users, products, orders}: RouterProps) => {

    useEffect(() => {
        if (users.length === 0) {
            getUsers()
        }
        if (products.length === 0) {
            getProducts()
        }
        if (orders.length === 0) {
            getOrders()
        }
    }, [])

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/users" element={<UsersList/>}/>
                    <Route path="/users/form" element={<UsersForm/>}/>
                    <Route path="/user/edit/:login" element={<UsersForm/>}/>
                    <Route path="/products" element={<ProductsList/>}/>
                    <Route path="/products/form" element={<ProductsForm/>}/>
                    <Route path="/products/form/edit/:id" element={<ProductsForm/>}/>
                    <Route path="/orders" element={<OrdersList/>}/>
                    <Route path="/orders/history" element={<OrdersList history={true}/>}/>
                    <Route path="/yourOrders" element={<OrdersListOfUser history={false}/>}/>
                    <Route path="/yourOrders/history" element={<OrdersListOfUser history={true}/>}/>
                    <Route path="/orders/form" element={<OrdersForm/>}/>
                    <Route path="/stats" element={<OrdersStats/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

const mapStateToProps = (state: RootStore) => {
    return {
        users: getAllUsers(state),
        products: getAllProducts(state),
        orders: state.orders.orders
    }
}

const mapDispatchToProps = {
    getUsers,
    getProducts,
    getOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);