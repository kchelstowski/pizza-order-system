import React from 'react';
import {Menubar} from 'primereact/menubar';
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie"
import {RootStore} from "../../ducks/RootReducer";
import {getOneUser} from "../../ducks/users/selectors";
import {User} from "../../ducks/users/interfaces";
import {connect} from "react-redux";
import {getUsers} from "../../ducks/users/operations";
import {Chip} from 'primereact/chip';

interface MenuProps {
    user: User | undefined
}

const Menu = ({user}: MenuProps) => {

    const navigate = useNavigate()

    const itemsAsAdmin = [

        {
            label: 'Users',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'List',
                    icon: 'pi pi-list',
                    command: () => navigate('/users')

                },
            ]
        },
        {
            label: 'Orders',
            icon: 'pi pi-shopping-cart',
            items: [
                {
                    label: "Current",
                    icon: 'pi pi-clock',
                    command: () => navigate("/orders")
                },
                {
                    label: "History",
                    icon: 'pi pi-history',
                    command: () => navigate("/orders/history")
                }
            ]
        },
        {
            label: 'Products',
            icon: 'pi pi-shopping-bag',
            items: [
                {
                    label: "List",
                    icon: 'pi pi-list',
                    command: () => navigate('/products')
                },
                {
                    label: "Add a product",
                    icon: 'pi pi-plus-circle',
                    command: () => navigate('/products/form')
                }
            ]
        },
        {
            label: 'Statistics',
            icon: 'pi pi-chart-bar',
            command: () => navigate('/stats')
        }


    ];
    const itemsAsUser = [
        {
            label: 'Orders',
            icon: 'pi pi-shopping-cart',
            items: [
                {
                    label: "Make an order",
                    icon: 'pi pi-plus',
                    command: () => navigate("/orders/form")
                },
                {
                    label: "Current",
                    icon: 'pi pi-clock',
                    command: () => {
                        navigate("/yourOrders")
                    }
                },
                {
                    label: "History",
                    icon: 'pi pi-history',
                    command: () => {
                        navigate("/yourOrders/history")
                    }
                }
            ]
        },
        {
            label: 'Products',
            icon: 'pi pi-shopping-bag',
            items: [
                {
                    label: "List",
                    icon: 'pi pi-list',
                    command: () => navigate('/products')
                }
            ]
        },


    ];
    const logout = () => {
        Cookies.remove('username')
        navigate("/login")
    }
    const editAccount = () => {
        navigate(`/user/edit/${Cookies.get('username')}`)
    }

    const start = <h2>PIZZA ORDERING SYSTEM</h2>
    const end =
        <div className="flex-row">
            <Chip label={"Currently logged as " + user?.login} icon="pi pi-user" className="mr-2 mb-2"/>
            <Button label="Edit account" className="p-button-rounded p-button-warning p-button-outlined"
                    onClick={editAccount}/>
            <Button label="Logout" className="p-button-rounded p-button-danger p-button-outlined" onClick={logout}/>
        </div>

    const checkIfAdmin = () => {
        return !!(user && user.root)
    }

    return (
        <div>
            <div className="menu-bar">
                <Menubar model={checkIfAdmin() ? itemsAsAdmin : itemsAsUser} start={start} end={end}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state: RootStore) => {
    return {
        user: getOneUser(state, Cookies.get('username'))
    }
}

const mapDispatchToProps = {
    getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)