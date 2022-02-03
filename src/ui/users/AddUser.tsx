import React from 'react';
import {InputText} from "primereact/inputtext";
import {Message} from "primereact/message";
import {Password} from "primereact/password";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {FormikProps} from "formik";
import {UserFormValues} from "./UsersForm";
import {useNavigate} from "react-router-dom";

interface AddUserProps {
    formik: FormikProps<UserFormValues>,
    validationError: string,
    successMessage: string,
    error: any
}

const AddUser = ({formik,validationError,successMessage, error}: AddUserProps) => {

    const navigate = useNavigate()

    return (
        <div>
            <div className="register-form">
                <h2 className="uppercase">register</h2>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="all-fields">
                        <div className="field">
                            <span className="p-float-label">
                                <InputText name="login" value={formik.values.login} onChange={formik.handleChange}/>
                                <label htmlFor="login">Login: </label>
                            </span>
                            {formik.errors.login && <div className="validationWarn" ><Message severity="warn" text={formik.errors.login} className="validationWarn" /></div>}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange}/>
                                <label htmlFor="password">Password: </label>
                            </span>
                            {formik.errors.password && <div className="validationWarn" ><Message severity="warn" text={formik.errors.password} className="validationWarn" /></div>}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Password id="confirmedPassword" name="confirmedPassword" value={formik.values.confirmedPassword} onChange={formik.handleChange}/>
                                <label htmlFor="password">Confirm password: </label>
                            </span>
                            {formik.errors.confirmedPassword && <div className="validationWarn" ><Message severity="warn" text={formik.errors.confirmedPassword} className="validationWarn" /></div>}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <InputText name="firstName" value={formik.values.firstName} onChange={formik.handleChange}/>
                                <label htmlFor="firstName">First name: </label>
                            </span>
                            {formik.errors.firstName && <div className="validationWarn" ><Message severity="warn" text={formik.errors.firstName} className="validationWarn" /></div>}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <InputText name="lastName" value={formik.values.lastName} onChange={formik.handleChange}/>
                                <label htmlFor="lastName">Last name: </label>
                            </span>
                            {formik.errors.lastName &&
                            <div className="validationWarn"><Message severity="warn" text={formik.errors.lastName}
                                                                     className="validationWarn"/></div>}
                        </div>
                        <div className="field">
                            <div className="flex">
                                <label htmlFor="dateOfBirth" className="label-dob">Date of birth: </label>
                                <Calendar name="dateOfBirth" yearNavigator yearRange="1900:2022" value={formik.values.dateOfBirth} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon disabledDates={[]} />
                            </div>
                            {formik.errors.dateOfBirth && <div className="validationWarn" ><Message severity="warn" text={formik.errors.dateOfBirth} /></div>}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Dropdown id="gender" name="gender" value={formik.values.gender} options={['Male','Female']} onChange={formik.handleChange} placeholder="Select a gender"/>
                            </span>
                            {formik.errors.gender && <div className="validationWarn" ><Message severity="warn" text={formik.errors.gender} className="validationWarn" /></div>}
                        </div>
                        <div className="field-buttons">
                            <Button label="Submit" className="p-button-outlined" type="submit" />
                            <Button label="Go back" className="p-button-outlined p-button-warning" onClick={() => navigate(-1)} />
                        </div>
                        <div className="field">
                            {validationError && <Message severity="error" text={validationError} />}
                            {successMessage && <Message severity="success" text={successMessage} />}
                            {error && <Message severity="error" text={error} />}
                        </div>
                        <div className="field">
                            <div className="account-question">
                                Do you have an account? Log-in now!
                                <Button label="Log-in" className="p-button-outlined p-button-info" onClick={() => navigate("/login")} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;