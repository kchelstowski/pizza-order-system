import React, {useEffect, useState} from 'react';
import {deleteOrder, editStatus, getOrders} from "../../ducks/orders/operations";
import {connect} from "react-redux";
import {RootStore} from "../../ducks/RootReducer";
import {Order, Status} from "../../ducks/orders/interfaces";
import {User} from "../../ducks/users/interfaces";
import {Product} from "../../ducks/products/interfaces";
import {getAllProducts} from "../../ducks/products/selectors";
import {findNameOfClient, getAllUsers, getOneUser} from "../../ducks/users/selectors";
import {Form, Formik} from 'formik';
import {getProducts} from "../../ducks/products/operations";
import {getUsers} from "../../ducks/users/operations";
import Menu from "../dashboard/Menu";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Message} from "primereact/message";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import _ from "lodash";
import {confirmPopup} from "primereact/confirmpopup";


interface OrdersListProps {
    users: User[],
    getOrders: () => void,
    editStatus: (values: Status, id: string) => void,
    error: any,
    loading: boolean,
    orders: Order[],
    products: Product[],
    getProducts: () => void,
    getUsers: () => void,
    history?: boolean,
    currUser: User | undefined,
    deleteOrder: (id: string) => void
}

type OrdersToShowType = { date: string; order: (string | JSX.Element)[]; price: string; client: JSX.Element; changeStatus: JSX.Element; operations: JSX.Element; id: string; status: string; }[]


const OrdersList = ({
                        currUser,
                        users,
                        getOrders,
                        error,
                        loading,
                        orders,
                        products,
                        editStatus,
                        getProducts,
                        getUsers,
                        history,
                        deleteOrder
                    }: OrdersListProps) => {

    const navigate = useNavigate()
    const [showHistory, setShowHistory] = useState(false)
    //Check if history passed as props in menu links is true or false - if you click Orders->History, it should be true, so it will show history orders
    useEffect(() => {
        history ? setShowHistory(history) : setShowHistory(false)
    }, [history])
    useEffect(() => {
        if (orders.length === 0) {
            getOrders()
        }
        if (products.length === 0) {
            getProducts()
        }
        if (users.length === 0) {
            getUsers()
        }
        //if currentuser is not a root, navigate him to OrdersForm
        if (currUser) {
            if (!currUser.root) navigate("/orders/form")
        }
    }, [users])

    const availableStatuses = [
        "Pending",
        "Provider has received the order",
        "On the road to delivery point",
        "Completed"
    ]
    const handleSubmit = (values: Status, id: string) => {
        editStatus(values, id)
    }
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to delete this order from history?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteOrder(id)
        });
    }

    const currStatus = (rowData: Order) => {
        if (rowData.status !== "Completed") {
            return <Message severity="info" text={rowData.status}/>
        }
        return <Message severity="success" text={rowData.status}/>
    }
    const currFilter = (order: { date: string; operations: JSX.Element; price: string; client: JSX.Element; changeStatus: JSX.Element; id: string; order: (JSX.Element | string)[]; status: string }) => {
        if (showHistory) {
            return order.status === "Completed"
        }
        return order.status !== "Completed"
    }
    const ordersConverted = orders.map(order => {
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
                price: order.price.toFixed(2),
                client: <p>{order.client} ({findNameOfClient(users, order.client)})</p>,
                changeStatus:
                    <Formik
                        initialValues={{status: order.status}}
                        onSubmit={(values) => handleSubmit(values, order.id)}>
                        {({values, handleChange}) => {
                            return (
                                <Form>
                                    <div className="changeStatus-div">
                                        <Dropdown name="status" value={values.status} options={availableStatuses}
                                                  onChange={handleChange}/>
                                        <Button className="p-button-outlined p-button-primary changeStatus-button"
                                                type="submit" label="Confirm"/>
                                    </div>
                                </Form>
                            )
                        }}

                    </Formik>,
                operations:
                    <div>
                        {order.status === "Completed" &&
                        <Button className="p-button-outlined p-button-danger" onClick={(e) => handleDelete(e, order.id)}
                                label="Delete the order"/>}
                    </div>
            }
        )
    })
        .filter(order => currFilter(order))

    const [ordersToShow = ordersConverted, setOrdersToShow] = useState<OrdersToShowType>()
    const availableSortOptions = ['Price (asc)', 'Price (desc)', 'Date (asc)', 'Date (desc)']

    const sortFunction = (orders: OrdersToShowType, option: React.SetStateAction<string>) => {
        switch (option) {
            case 'Price (asc)':
                return _.orderBy(orders, ['price'], 'asc')
            case 'Price (desc)':
                return _.orderBy(orders, ['price'], 'desc')
            case 'Date (asc)':
                return _.orderBy(orders, ['date'], 'asc')
            case 'Date (desc)':
                return _.orderBy(orders, ['date'], 'desc')
            default:
                return orders
        }
    }
    const [selectedSort, setSelectedSort] = useState('')
    const handleSortChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedSort(e.target.value)
        setOrdersToShow(sortFunction(ordersToShow, e.target.value))
    }

    return (
        <>
            <Menu/>
            {history ? <h1 className="uppercase">History of orders</h1> :
                <h1 className="uppercase">Not completed orders</h1>}
            {loading && <p>Loading...</p>}
            <div>
                <span>Sort by: </span>
                <Dropdown value={selectedSort} options={availableSortOptions} onChange={handleSortChange}/>
            </div>
            <DataTable value={ordersToShow} responsiveLayout="scroll">
                <Column field="date" header="Date"/>
                <Column field="order" header="Products"/>
                <Column field="price" header="Price"/>
                <Column field="client" header="Client"/>
                <Column field="status" header="Status" body={currStatus}/>
                <Column field="changeStatus" header="Change status"/>
                <Column field="operations" header="Operations"/>
            </DataTable>
            {error && <p>{error}</p>}
        </>
    );
};

const mapStateToProps = (state: RootStore) => {
    return {
        users: getAllUsers(state),
        error: state.users.error,
        loading: state.users.loading,
        products: getAllProducts(state),
        orders: state.orders.orders,
        currUser: getOneUser(state, Cookies.get('username'))
    }
}
const mapDispatchToProps = {
    getOrders,
    editStatus,
    getProducts,
    getUsers,
    deleteOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList);