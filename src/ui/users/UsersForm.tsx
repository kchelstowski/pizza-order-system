import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {addUser, editUser} from "../../ducks/users/operations";
import {connect} from "react-redux";
import {User} from "../../ducks/users/interfaces";
import {useNavigate, useParams} from "react-router-dom";
import {RootStore} from "../../ducks/RootReducer";
import * as Yup from "yup";
import {getAllUsers} from "../../ducks/users/selectors";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import {clearSuccessMessage} from "../../ducks/successCatcher/actions";
import Cookies from "js-cookie";
import {userClearError} from "../../ducks/users/actions";


interface UserFormProps {
    addUser: (user: User) => void,
    successMessage: string
    users: User[],
    editUser: (user: User) => void,
    error: any,
    userClearError: () => void,
    clearSuccessMessage: () => void
}

export interface UserFormValues {
    login: string,
    currentPassword?: string,
    password: string,
    confirmedPassword: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    gender: string,
    root: boolean
}

const UsersForm = ({addUser,successMessage,users,editUser,error,userClearError,clearSuccessMessage}: UserFormProps) => {

    //clear error if any
    useEffect(() => {
        clearSuccessMessage()
        userClearError()
    }, [])

    const navigate = useNavigate()
    const params = useParams()
    const [initialValues,setInitialValues] = useState({
        login: '',
        password: '',
        confirmedPassword: '',
        firstName: '',
        lastName: '',
        dateOfBirth: new Date(),
        gender: '',
        root: false
    })

    //if editing, then set initialvalues as values of the user
    useEffect(() => {
        if (params.login) {
            const editedUser = users.find(user => user.login === params.login)
            if (params.login !== Cookies.get('username')) navigate("/orders/form")
            if (editedUser) {
                editedUser.root ? setInitialValues({
                    login: editedUser.login,
                    password: editedUser.password,
                    confirmedPassword: editedUser.password,
                    firstName: editedUser.firstName,
                    lastName: editedUser.lastName,
                    dateOfBirth: new Date(editedUser.dateOfBirth),
                    gender: editedUser.gender,
                    root: true
                })
                    : setInitialValues({
                        login: editedUser.login,
                        password: editedUser.password,
                        confirmedPassword: editedUser.password,
                        firstName: editedUser.firstName,
                        lastName: editedUser.lastName,
                        dateOfBirth: new Date(editedUser.dateOfBirth),
                        gender: editedUser.gender,
                        root: false
                    })


            }
        }
        else {
            setInitialValues({
                login: '',
                password: '',
                confirmedPassword: '',
                firstName: '',
                lastName: '',
                dateOfBirth: new Date(),
                gender: '',
                root: false
            })
        }
    }, [params,users])


    const [validationError,setValidationError] = useState('')
    const handleSubmit = (values: UserFormValues) => {
        if (params.login) {
            if (values.password !== values.confirmedPassword) {
                setValidationError("Passwords are not the same")
                return
            }
            const editedUser = users.find(user => user.login === params.login)
            if (values.password !== editedUser?.password) {
                if (!values.currentPassword) {
                    setValidationError("Current password can't be empty")
                    return
                }
            }
            editUser(values)
        }
        else {
            const valuesToSubmit: User = {
                login: values.login,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                dateOfBirth: values.dateOfBirth,
                gender: values.gender
            }
            if (valuesToSubmit.password !== values.confirmedPassword) {
                setValidationError("Passwords are not the same")
                return
            }
            addUser(valuesToSubmit)
        }
    }
    const validationSchema = Yup.object().shape({
        login: Yup.string().required("Login is required"),
        dateOfBirth: Yup.date().max(new Date(), "Date of birth can't be older than today"),
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        password: Yup.string().required("Password is required"),
        confirmedPassword: Yup.string().required("You need to confirm password"),
        gender: Yup.string().required("Gender is required")

    })
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema,
        onSubmit: (values, {resetForm}) => {
            setValidationError('')
            clearSuccessMessage()
            userClearError()
            handleSubmit(values)
            resetForm({values: undefined})
        },


    })

    return (
        <div>
            {params.login ? <EditUser formik={formik} validationError={validationError} successMessage={successMessage} initialValues={initialValues} setInitialValues={setInitialValues} userLogin={params.login} error={error} />
                : <AddUser formik={formik} validationError={validationError} successMessage={successMessage} error={error}   />}
        </div>
    );
};

const mapStateToProps = (state: RootStore) => {
    return {
        users: getAllUsers(state),
        successMessage: state.success.message,
        error: state.users.error
    }
}

const mapDispatchToProps = {
    addUser,
    editUser,
    userClearError,
    clearSuccessMessage
}

export default connect(mapStateToProps,mapDispatchToProps)(UsersForm);


