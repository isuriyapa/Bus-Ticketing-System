import React, { useEffect, useRef, useState } from "react";
import '../styles/login.css'
import { ToastContainer, toast } from 'react-toastify';
import RestService from "../services/RestService";
import bg from '../assets/login-bg.jpg'
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleValidationErrorMsg(msg){
        toast.error(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    function handleAuthenticate() {

        //Empty fields validtaion
        if (username == '' || password == '') {
            handleValidationErrorMsg('Inputs cannot be empty')
            return;
        }

        RestService.authenticateUser(username, password).then((res) => {
            if (res.data.token != null) {
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("isLogged", true);

                sessionStorage.setItem("name", res.data.userDto.name);
                sessionStorage.setItem("email", res.data.userDto.email);

                sessionStorage.setItem("role", res.data.userDto.role);
                sessionStorage.setItem("username", res.data.userDto.username);
                sessionStorage.setItem("mobileNo", res.data.userDto.username);

                sessionStorage.setItem("id", res.data.userDto.id);
                window.location.href = '/';

            } else {
                toast.error('Login failed!! Please try again.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }).catch((err) => {
            console.log(err);
            toast.error('Login failed!! Please try again.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        })
    }

    return (
        <div className="col-lg-12 row" style={{height:'100%'}}>
            <div className="col-lg-6 d-flex justify-content-center align-items-center">
                <img src={bg} alt="" style={{height:'90vh', width:'100%'}} />
            </div>

            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
                <h1>Ticket<span style={{color:'yellow'}}>+</span></h1>
                <input placeholder="username" type="text" onChange={(e) => setUsername(e.target.value)} className='form-control login-input' />
                <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} className='form-control login-input' />
                <button className='btn btn-dark login-btn' onClick={handleAuthenticate} >LOGIN</button>
                <label htmlFor="" className="m-4 login-label"> Forgot Password?</label>
                <label htmlFor=""> Don't have an account?</label>
                <a className="login-link" href="/register">Create a new account</a>
            </div>



            {/* d-flex justify-content-center align-items-center */}
        </div>
    );
}

export default LoginPage;