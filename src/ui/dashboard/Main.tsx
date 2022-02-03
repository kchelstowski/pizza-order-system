import React from 'react';
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";


const Main = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="main-grid">
                <div className="main-box1">
                    <Button label="Login" icon="pi pi-user-plus" className="p-button-outlined p-button-info" onClick={() => navigate("/login")} />
                </div>
                <div className="main-box2">
                    <Button label="Register" icon="pi pi-user-plus" className="p-button-outlined p-button-success" onClick={() => navigate("/users/form")}/>
                </div>
            </div>
        </div>
    );
};

export default Main;