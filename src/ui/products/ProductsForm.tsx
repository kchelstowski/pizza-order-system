import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {v4 as uuidv4 } from 'uuid';
import {connect} from "react-redux";
import {Product} from "../../ducks/products/interfaces";
import {addProduct, editProduct} from "../../ducks/products/operations";
import Menu from "../dashboard/Menu";
import {useNavigate, useParams} from "react-router-dom";
import {RootStore} from "../../ducks/RootReducer";
import {getAllProducts} from "../../ducks/products/selectors";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";
import {Message} from "primereact/message";
import {clearSuccessMessage} from "../../ducks/successCatcher/actions";
import {getAllUsers} from "../../ducks/users/selectors";
import {User} from "../../ducks/users/interfaces";
import {getUsers} from "../../ducks/users/operations";
import Cookies from "js-cookie";
import * as Yup from "yup";
import {productsClearError} from "../../ducks/products/actions";


interface ProductsFormProps {
    addProduct: (product: Product) => void,
    editProduct: (product: Product) => void
    products: Product[],
    successMessage: string,
    clearSuccessMessage: () => void,
    error: string,
    users: User[],
    productsClearError: () => void
}

const ProductsForm = ({addProduct,editProduct,products,successMessage,clearSuccessMessage,error,users,productsClearError}: ProductsFormProps) => {


    useEffect(() => {
        //if users haven't been loaded anywhere yet, load them
        if (users.length===0) {
            getUsers()
        }
        //if currentuser is not a root, navigate him to OrdersForm
        const currentUser = users.find(user => user.login===Cookies.get('username'))
        if (currentUser) {
            if (!currentUser.root) navigate("/orders/form")
        }
        //clear successmessage and error if any
        clearSuccessMessage()
        productsClearError()
    }, [users])

    interface ProductsFormValues {
        id: string,
        name: string,
        category: string,
        price: number,
        amount: number
    }
    const params = useParams()
    const navigate = useNavigate()

    const [initialValues,setInitialValues] = useState({
        id: '',
        name: '',
        category: '',
        price: 0,
        amount: 1
    })

    //if editing, then set initialvalues as values of product
    useEffect(() => {
        if (params.id) {
            const editedProduct = products.find(product => product.id===params.id)
            if (editedProduct) {
                setInitialValues({
                    id: editedProduct.id,
                    name: editedProduct.name,
                    category: editedProduct.category,
                    price: editedProduct.price,
                    amount: editedProduct.amount
                })
            }
        }
        else {
            setInitialValues({
                id: uuidv4(),
                name: '',
                category: '',
                price: 0,
                amount: 1
            })
        }
    }, [params,products])

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name of product is required"),
        category: Yup.string().required("Category is required"),
        price: Yup.number().required("Price is required"),
        amount: Yup.number().required("Amount is required"),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema,
        onSubmit: (values, {resetForm}) => {
            productsClearError()
            clearSuccessMessage()
            handleSubmit(values)
            resetForm({values: undefined})
        },
    })

    const handleSubmit = (values: ProductsFormValues) => {
        if (params.id) {
            editProduct(values)
        }
        else {
            const id = uuidv4()
            const valuesToSubmit = {
                id: id,
                name: values.name,
                category: values.category,
                price: values.price,
                amount: values.amount
            }
            addProduct(valuesToSubmit)
        }
    }

    return (
        <div>
            <Menu />
            <div className="products-form">
                {params.id ? <h2 className="uppercase">Edit a product</h2> : <h2 className="uppercase">Add a product</h2>}
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="all-fields">
                        <div className="field">
                            <span className="p-float-label">
                                <InputText name="name" value={formik.values.name} onChange={formik.handleChange}/>
                                <label htmlFor="name">Name: </label>
                            </span>
                            {formik.errors.name && <div className="validationWarn" ><Message severity="warn" text={formik.errors.name} className="validationWarn" /></div>}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <InputText name="category" value={formik.values.category} onChange={formik.handleChange}/>
                                <label htmlFor="category">Category: </label>
                            </span>
                            {formik.errors.category && <div className="validationWarn" ><Message severity="warn" text={formik.errors.category} className="validationWarn" /></div>}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <InputNumber name="price" value={formik.values.price} onValueChange={formik.handleChange} mode="decimal" minFractionDigits={0} maxFractionDigits={2}/>
                                <label htmlFor="price">Price: </label>
                            </span>
                            {formik.errors.price && <div className="validationWarn" ><Message severity="warn" text={formik.errors.price} className="validationWarn" /></div>}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <InputNumber name="amount" value={formik.values.amount} onValueChange={formik.handleChange} />
                                <label htmlFor="price">Amount: </label>
                            </span>
                            {formik.errors.amount && <div className="validationWarn" ><Message severity="warn" text={formik.errors.amount} className="validationWarn" /></div>}
                        </div>
                        <div className="field-buttons">
                            <Button label="Submit" className="p-button-outlined" type="submit" />
                            <Button label="Go back" className="p-button-outlined p-button-warning" onClick={() => navigate(-1)} />
                        </div>
                        <div className="field">
                            {successMessage && <Message severity="success" text={successMessage} />}
                            {error && <Message severity="error" text={error} />}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootStore) => {
    return {
        users: getAllUsers(state),
        products: getAllProducts(state),
        successMessage: state.success.message,
        error: state.products.error
    }
}

const mapDispatchToProps = {
    getUsers,
    addProduct,
    editProduct,
    clearSuccessMessage,
    productsClearError
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductsForm);


