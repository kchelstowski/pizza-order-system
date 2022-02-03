import {ErrorMessage, Form, Formik} from 'formik';
import React, {useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import {connect} from "react-redux";
import {Order, OrdersFormValues} from "../../ducks/orders/interfaces";
import {addOrder} from "../../ducks/orders/operations";
import {RootStore} from "../../ducks/RootReducer";
import {getProducts} from "../../ducks/products/operations";
import {getAllProducts} from "../../ducks/products/selectors";
import {getOneUser} from "../../ducks/users/selectors";
import Menu from "../dashboard/Menu";
import Cookies from "js-cookie";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {Product} from "../../ducks/products/interfaces";
import {User} from "../../ducks/users/interfaces";
import {Message} from "primereact/message";
import {Chip} from "primereact/chip";
import OrdersListOfUser from "./OrdersListOfUser";
import {clearSuccessMessage} from "../../ducks/successCatcher/actions";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {ordersClearError} from "../../ducks/orders/actions";


interface OrdersFormProps {
    addOrder: (order: Order) => void,
    products: Product[],
    user: User | undefined,
    getProducts: () => void,
    success: string,
    clearSuccessMessage: () => void,
    error: string,
    ordersClearError: () => void

}


const OrdersForm = ({
                        addOrder,
                        products,
                        user,
                        getProducts,
                        success,
                        clearSuccessMessage,
                        error,
                        ordersClearError
                    }: OrdersFormProps) => {

    const client = user ? user.login : 'unknown'
    const navigate = useNavigate()

    useEffect(() => {
        //if someone not logged in tries to go into /orders/form, navigate him to main
        if (!user) navigate("/")
        if (products.length === 0) {
            getProducts()
        }
        //clear successmessage and error if any
        clearSuccessMessage()
        ordersClearError()
    }, [])

    const initialValues: OrdersFormValues = {
        id: uuidv4(),
        client: '',
        checked: [],
    }

    const validationSchema = Yup.object().shape({
        checked: Yup.array().min(1, "Select at least one ingredient")
    })

    const handleSubmit = (values: OrdersFormValues) => {
        clearSuccessMessage()
        const id = uuidv4()
        addOrder({
            id: id,
            client: client,
            order: values.checked,
            price: sumProducts(values.checked),
            date: new Date(),
            status: "Pending"
        })
    }

    const sumProducts = (prod: Array<string>) => {
        return prod.reduce((acc, curr) => {
            const currProduct = products.find(product => product.id === curr)
            if (currProduct) {
                return acc + currProduct.price
            }
            return acc
        }, 0)
    }

    return (
        <div>
            <Menu/>
            <div className="order-form-main">
                <div className="order-form-formik">
                    <Formik
                        initialValues={
                            initialValues
                        }
                        validationSchema={validationSchema}
                        onSubmit={(values, {resetForm}) => {
                            handleSubmit(values);
                            resetForm({values: undefined})
                        }}
                        enableReinitialize={true}

                    >
                        {({values, handleChange}) => {
                            return (
                                <Form className="p-fluid">
                                    <div className="all-fields">
                                        <div className="field-order-form">
                                            <label htmlFor="products">
                                                <div className="checkboxes">
                                                    <h3 className="ingredients-h3">Choose ingredients:</h3>
                                                    {products && products
                                                        .filter(product => product.amount !== 0)
                                                        .map(product =>
                                                            <label key={product.id}
                                                                   className="order-form-single-product">
                                                                <Checkbox name="checked"
                                                                          checked={!!values.checked.find(prod => prod === product.id)}
                                                                          onChange={handleChange} value={product.id}/>
                                                                {product.name} ({product.price})
                                                            </label>
                                                        )}
                                                </div>
                                            </label>
                                            <Chip label={sumProducts(values.checked).toFixed(2)} icon="pi pi-dollar"
                                                  className="mr-2 mb-2 current-price"/>
                                            <Button label="Order" className="p-button-outlined p-button-success"
                                                    type="submit"/>
                                            <Button label="Go back" className="p-button-outlined p-button-warning"
                                                    onClick={() => navigate(-1)}/>
                                            <ErrorMessage name="checked"/>
                                            {success && <Message severity="success" text={success}/>}
                                            {error && <Message severity="error" text={error}/>}
                                        </div>

                                    </div>
                                </Form>

                            )
                        }}

                    </Formik>

                </div>
                <div>
                    <OrdersListOfUser notShowMenu={true}/>
                </div>
            </div>

        </div>
    );
};

const mapStateToProps = (state: RootStore) => {
    return {
        products: getAllProducts(state),
        user: getOneUser(state, Cookies.get('username')),
        success: state.success.message,
        error: state.orders.error
    }

}

const mapDispatchToProps = {
    addOrder,
    getProducts,
    clearSuccessMessage,
    ordersClearError
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersForm);


