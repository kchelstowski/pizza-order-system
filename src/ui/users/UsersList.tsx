import React, {useEffect} from 'react';
import {deleteUser, getUsers, userChangeRootStatus} from "../../ducks/users/operations";
import {connect} from "react-redux";
import {RootStore} from "../../ducks/RootReducer";
import {User} from "../../ducks/users/interfaces";
import {getAllUsers} from "../../ducks/users/selectors";
import Menu from "../dashboard/Menu";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Message} from "primereact/message";
import {Button} from "primereact/button";
import {confirmPopup} from "primereact/confirmpopup";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";


interface UsersListProps {
    users: User[],
    getUsers: () => void,
    error: any,
    loading: boolean,
    userChangeRootStatus: (login: string, newStatus: boolean) => void,
    deleteUser: (id: string) => void
}

const UsersList = ({users, getUsers, error, loading, userChangeRootStatus, deleteUser}: UsersListProps) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (users.length === 0) {
            getUsers()
        }
        //if currentuser is not a root, navigate him to OrdersForm else (no one is logged-in) navigate to main
        const currentUser = users.find(user => user.login === Cookies.get('username'))
        if (currentUser) {
            if (!currentUser.root) navigate("/orders/form")
        } else navigate("/")
    }, [users])

    const handleRootChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, login: string, newRootStatus: boolean) => {
        if (newRootStatus) {
            confirmPopup({
                target: event.currentTarget,
                message: 'Are you sure you want to make this user the root?',
                icon: 'pi pi-exclamation-triangle',
                accept: () => userChangeRootStatus(login, true)
            });
        } else {
            confirmPopup({
                target: event.currentTarget,
                message: 'Are you sure you want to disable root function for this user?',
                icon: 'pi pi-exclamation-triangle',
                accept: () => userChangeRootStatus(login, false)
            });
        }
    }
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, login: string) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to delete this user?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteUser(login)
        });
    }

    const usersToShow = users.map(user => {
        return (
            {
                ...user,
                login: user.login,
                name: `${user.firstName} ${user.lastName}`,
                dateOfBirth: user.dateOfBirth.toString().split("T")[0],
                gender: user.gender,
                root: user.root ? <Message severity="success"/> : <Message severity="error"/>,
                operations:
                    <div className="flex-column-operations">
                        <Button label="Delete" className="p-button-outlined p-button-danger"
                                onClick={(e) => handleDelete(e, user.login)}/>
                        {user.root ? <Button label="Disable root" className="p-button-outlined p-button-help"
                                             onClick={(e) => handleRootChange(e, user.login, false)}/>
                            : <Button label="Enable root" className="p-button-outlined p-button-success"
                                      onClick={(e) => handleRootChange(e, user.login, true)}/>}

                    </div>
            }
        )
    })
    return (
        <>
            <Menu/>
            <h1 className="uppercase">Users list</h1>
            {loading && <p>Loading...</p>}
            <DataTable value={usersToShow}>
                <Column field="login" header="Login"/>
                <Column field="name" header="Name"/>
                <Column field="dateOfBirth" header="Date of birth"/>
                <Column field="gender" header="Gender"/>
                <Column field="root" header="Root"/>
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
        loading: state.users.loading
    }
}
const mapDispatchToProps = {
    getUsers,
    userChangeRootStatus,
    deleteUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);