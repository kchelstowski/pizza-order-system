import React, {useEffect, useState} from 'react';
import {InputText} from "primereact/inputtext";
import {Message} from "primereact/message";
import {Password} from "primereact/password";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {FormikProps} from "formik";
import {UserFormValues} from "./UsersForm";
import {useNavigate} from "react-router-dom";
import {RootStore} from "../../ducks/RootReducer";
import {connect} from "react-redux";
import {User} from "../../ducks/users/interfaces";
import * as _ from "lodash";
import Menu from "../dashboard/Menu";

interface EditUserProps {
    formik: FormikProps<UserFormValues>,
    validationError: string,
    successMessage: string,
    initialValues: UserFormValues,
    setInitialValues: React.Dispatch<React.SetStateAction<UserFormValues>>,
    userLogin: string,
    users?: User[],
    error: any
}

const EditUser = ({
                      formik,
                      validationError,
                      successMessage,
                      initialValues,
                      setInitialValues,
                      userLogin,
                      users,
                      error
                  }: EditUserProps) => {
    const editedUser = users && users.find(user => user.login === userLogin)
    const navigate = useNavigate()
    const [changePassword, setChangePassword] = useState(false)
    const handleChangePassword = () => {
        if (changePassword) {
            setChangePassword(!changePassword)
            setInitialValues(_.omit({
                ...initialValues,
                password: editedUser?.password ? editedUser.password : '',
                confirmedPassword: editedUser?.password ? editedUser.password : ''
            }, 'currentPassword'))
        } else {
            setChangePassword(!changePassword)
            setInitialValues({...initialValues, password: '', confirmedPassword: '', currentPassword: ''})
        }
    }
    useEffect(() => {
        if (successMessage === 'Password has been changed successfully') navigate("/login")
    }, [successMessage])

    return (
        <div>
            <Menu/>
            <div className="register-form">
                <h2 className="uppercase">Edit account</h2>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    {changePassword ?
                        <div className="all-fields">
                            <div className="changePassword-box">
                                <div className="field">
                                    <label htmlFor="currentPassword">Current password: </label>
                                    <Password id="currentPassword" name="currentPassword"
                                              value={formik.values.currentPassword} onChange={formik.handleChange}/>
                                </div>
                                <div className="field">
                                    <label htmlFor="password">New password: </label>
                                    <Password id="password" name="password" value={formik.values.password}
                                              onChange={formik.handleChange}/>
                                    {formik.errors.password && <div className="validationWarn"><Message severity="warn"
                                                                                                        text={formik.errors.password}
                                                                                                        className="validationWarn"/>
                                    </div>}
                                </div>
                                <div className="field">
                                    <label htmlFor="password">Confirm new password: </label>
                                    <Password id="password" name="confirmedPassword"
                                              value={formik.values.confirmedPassword}
                                              onChange={formik.handleChange}/>
                                    {formik.errors.confirmedPassword &&
                                    <div className="validationWarn"><Message severity="warn"
                                                                             text={formik.errors.confirmedPassword}
                                                                             className="validationWarn"/></div>}
                                </div>
                                <div className="field">
                                    <h4>After changing password you will have to log-in again</h4>
                                    <Button label="Submit" className="p-button-outlined p-button-primary"
                                            type="submit"/>
                                    <Button label="Go back" className="p-button-outlined p-button-warning"
                                            onClick={handleChangePassword}/>
                                </div>
                                <div className="field">
                                    {validationError && <Message severity="error" text={validationError}/>}
                                    {successMessage && <Message severity="success" text={successMessage}/>}
                                    {error && <Message severity="error" text={error}/>}
                                </div>
                            </div>

                        </div> :
                        <div className="all-fields">
                            <div className="field">
                                <span className="p-float-label">
                                    <InputText name="login" value={formik.values.login} onChange={formik.handleChange}/>
                                    <label htmlFor="login">Login: </label>
                                </span>
                                {formik.errors.login &&
                                <div className="validationWarn"><Message severity="warn" text={formik.errors.login}
                                                                         className="validationWarn"/></div>}
                            </div>
                            <div className="field">
                            <span className="p-float-label">
                                <InputText name="firstName" value={formik.values.firstName}
                                           onChange={formik.handleChange}/>
                                <label htmlFor="firstName">First name: </label>
                            </span>
                                {formik.errors.firstName &&
                                <div className="validationWarn"><Message severity="warn" text={formik.errors.firstName}
                                                                         className="validationWarn"/></div>}
                            </div>
                            <div className="field">
                            <span className="p-float-label">
                                <InputText name="lastName" value={formik.values.lastName}
                                           onChange={formik.handleChange}/>
                                <label htmlFor="lastName">Last name: </label>
                            </span>
                                {formik.errors.lastName &&
                                <div className="validationWarn"><Message severity="warn" text={formik.errors.lastName}
                                                                         className="validationWarn"/></div>}
                            </div>
                            <div className="field">
                                <div className="flex">
                                    <label htmlFor="dateOfBirth" className="label-dob">Date of birth: </label>
                                    <Calendar name="dateOfBirth" yearNavigator yearRange="1900:2022"
                                              value={formik.values.dateOfBirth} onChange={formik.handleChange}
                                              dateFormat="dd/mm/yy" mask="99/99/9999" showIcon disabledDates={[]}/>
                                </div>
                                {formik.errors.dateOfBirth && <div className="validationWarn"><Message severity="warn"
                                                                                                       text={formik.errors.dateOfBirth}/>
                                </div>}
                            </div>
                            <div className="field">
                            <span className="p-float-label">
                                <Dropdown id="gender" name="gender" value={formik.values.gender}
                                          options={['Male', 'Female']} onChange={formik.handleChange}
                                          placeholder="Select a gender"/>
                            </span>
                                {formik.errors.gender &&
                                <div className="validationWarn"><Message severity="warn" text={formik.errors.gender}
                                                                         className="validationWarn"/></div>}
                            </div>
                            <div className="field-buttons">
                                <Button label="Submit" className="p-button-outlined" type="submit"/>
                                <Button label="Go back" className="p-button-outlined p-button-warning"
                                        onClick={() => navigate(-1)}/>
                            </div>
                            <div className="field">
                                {validationError && <Message severity="error" text={validationError}/>}
                                {successMessage && <Message severity="success" text={successMessage}/>}
                                {error && <Message severity="error" text={error}/>}
                            </div>
                            <div className="field">
                                <Button label="Change password" className="p-button-outlined p-button-info"
                                        onClick={handleChangePassword}/>
                            </div>
                        </div>
                    }
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootStore) => {
    return {
        users: state.users.users
    }
}

export default connect(mapStateToProps, null)(EditUser);