import React, {useEffect, useState} from 'react';
import {Product} from "../../ducks/products/interfaces";
import {RootStore} from "../../ducks/RootReducer";
import {connect} from "react-redux";
import {getProducts, productDelete} from "../../ducks/products/operations";
import {getAllProducts} from "../../ducks/products/selectors";
import Menu from "../dashboard/Menu";
import {useNavigate} from "react-router-dom";
import {Message} from "primereact/message";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {getAllUsers, getOneUser} from "../../ducks/users/selectors";
import Cookies from "js-cookie";
import {User} from "../../ducks/users/interfaces";
import {getUsers} from "../../ducks/users/operations";
import {confirmPopup} from "primereact/confirmpopup";

interface ProductsListProps {
    products: Product[],
    loading: boolean,
    getProducts: () => void,
    error: any,
    user: User | undefined,
    users: User[],
    productDelete: (id: string) => void
}


const ProductsList = ({getProducts, products, loading, error, user, users, productDelete}: ProductsListProps) => {
    useEffect(() => {
        //if no users loaded, load
        if (users.length === 0) {
            getUsers()
        }
        //if no one is logged-in, navigate to main
        if (!user) navigate("/")
        if (products.length === 0) {
            getProducts()
        }
        setProductsToShow(products)
    }, [users, products])
    const navigate = useNavigate()
    const [productsToShow, setProductsToShow] = useState<Product[]>([])
    const [selectedFilter, setSelectedFilter] = useState('')
    const availableCategories = products.reduce((acc: string[], curr) => {
        if (acc.includes(curr.category)) {
            return acc
        }
        return [...acc, curr.category]
    }, ['None'])

    const handleFilterChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedFilter(e.target.value)
        if (e.target.value === "None") setProductsToShow(products)
        else setProductsToShow(products.filter(product => product.category === e.target.value))
    }

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to delete this product?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => productDelete(id)
        });
    }

    return (
        <>
            <Menu/>
            <h1 className="uppercase">Products list</h1>
            <div>
                <span>Filter by category: </span>
                <Dropdown value={selectedFilter} options={availableCategories} onChange={handleFilterChange}/>
            </div>
            {loading && <p>Loading...</p>}
            <div className="products-list">
                {productsToShow && productsToShow.map((product) => {
                    const footer = (
                        <span>
                                {user?.root && <span>
                                    <Button label="Edit" onClick={() => navigate(`/products/form/edit/${product.id}`)}
                                            className="p-button-outlined p-button-warning"
                                            style={{marginRight: '.25em'}}/>
                                    <Button label="Delete" onClick={(e) => handleDelete(e, product.id)}
                                            icon="pi pi-times" className="p-button-outlined p-button-danger"/>
                                </span>}

                            </span>
                    );
                    return (
                        <Card title={product.name} subTitle={product.category} key={product.id}
                              style={{width: '25rem', marginBottom: '2em'}} footer={footer}>
                            <h3><i className="pi pi-dollar">{product.price}</i></h3>
                            <h4>Amount left: {product.amount}</h4>
                            <p className="m-0" style={{lineHeight: '1.5'}}>Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                            </p>
                        </Card>
                    )
                })
                }
            </div>
            {error && <Message severity="error" text={error}/>}
        </>
    );
};

const mapStateToProps = (state: RootStore) => {
    return {
        user: getOneUser(state, Cookies.get('username')),
        products: getAllProducts(state),
        error: state.products.error,
        loading: state.products.loading,
        users: getAllUsers(state)
    }
}
const mapDispatchToProps = {
    getProducts,
    productDelete
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);