import React, {useEffect, useState} from 'react';
import {editStatus, getOrders} from "../../ducks/orders/operations";
import {connect} from "react-redux";
import {RootStore} from "../../ducks/RootReducer";
import {Order} from "../../ducks/orders/interfaces";
import {Product} from "../../ducks/products/interfaces";
import {getAllProducts} from "../../ducks/products/selectors";
import {getProducts} from "../../ducks/products/operations";
import {getUsers} from "../../ducks/users/operations";
import Menu from "../dashboard/Menu";
import {getOrdersOfUser} from "../../ducks/orders/selectors";
import Cookies from "js-cookie";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Message} from "primereact/message";

interface OrdersListOfUserProps {
    orders: Order[],
    products: Product[],
    history?: boolean,
    notShowMenu?: boolean
}


const OrdersListOfUser = ({orders, products, history, notShowMenu}: OrdersListOfUserProps) => {

    const [showHistory, setShowHistory] = useState(false)

    //Check if history passed as props in menu links is true or false - if you click Orders->History, it should be true, so it will show history orders
    useEffect(() => {
        history ? setShowHistory(history) : setShowHistory(false)
    }, [history])
    const currFilter = (order: { date: string; price: string; client: string; id: string; order: (JSX.Element | string)[]; status: string }) => {
        if (showHistory) {
            return order.status === "Completed";
        }
        return order.status !== "Completed"

    }
    const currStatus = (rowData: Order) => {
        if (rowData.status !== "Completed") {
            return <Message severity="info" text={rowData.status}/>
        }
        return <Message severity="success" text={rowData.status}/>
    }

    const ordersToShow = orders
        .map(order => {
            return (
                {
                    ...order,
                    date: `${order.date.toString().split("T")[0]} ${order.date.toString().split("T")[1].split(".")[0]}`,
                    order: order.order.map(ingredient => {
                        const product = products.find(product => ingredient === product.id)
                        if (product) {
                            return (<li key={product.id}>{product.name}</li>)
                        }
                        return ingredient
                    }),
                    price: order.price.toFixed(2)
                }
            )
        })
        .filter(order => currFilter(order))


    return (
        <>
            {!notShowMenu && <Menu/>}
            {showHistory ? <h1 className="uppercase">Your completed orders</h1> :
                <h1 className="uppercase">Your current orders</h1>}
            {orders &&
            <div>
                <div>
                    <DataTable value={ordersToShow} responsiveLayout="scroll">
                        <Column field="date" header="Date"/>
                        <Column field="order" header="Products"/>
                        <Column field="price" header="Price"/>
                        <Column field="status" header="Status" body={currStatus}/>
                    </DataTable>
                </div>
            </div>
            }
        </>
    );
};

const mapStateToProps = (state: RootStore) => {
    return {
        products: getAllProducts(state),
        orders: getOrdersOfUser(state, Cookies.get('username'))
    }
}
const mapDispatchToProps = {
    getOrders,
    editStatus,
    getProducts,
    getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersListOfUser);