import React, {useState} from 'react';
import {useFormik} from "formik";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import axios, {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import {Message} from "primereact/message";

const Login = () => {

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        onSubmit: values => {
            const getUser = async (login: string, password: string) => {
                try {
                    const response = await axios.post(`http://localhost:5000/users/login/${login}/${password}`)
                    if (response.status === 200) {
                        Cookies.set('username', login)
                        response.data.root ? navigate("/orders") : navigate("/orders/form")
                    }
                } catch (e) {
                    const err = e as AxiosError
                    setErr(err.response?.data)
                }
            }
            getUser(values.login, values.password)
        }
    })

    const [err, setErr] = useState<any>('')

    return (
        <div>
            <div className="login-form">
                <h2>LOG-IN</h2>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="all-fields">
                        <div className="field">
                            <span className="p-float-label">
                                <InputText name="login" value={formik.values.login} onChange={formik.handleChange}/>
                                <label htmlFor="login">Login </label>
                            </span>
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={formik.values.password}
                                          onChange={formik.handleChange}/>
                                <label htmlFor="password">Password </label>
                            </span>
                        </div>
                        {err && <Message severity="error" text={err}/>}
                        <div className="field">
                            <Button label="Submit" className="p-button-primary" type="submit"/>
                        </div>
                    </div>
                    <div className="account-question">
                        Don't have an account yet?
                        <Button label="Register" className="p-button-outlined p-button-success"
                                onClick={() => navigate("/users/form")}/>
                    </div>
                </form>

            </div>

        </div>
    );
};

export default Login;