import React, { useState } from 'react'
import "./LoginSignup.css"

const LoginSignup = () => {

    //title + state
    const [state, setState] = useState("Login");

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    })

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    //functions for login and signup

    const login = async () => {
        console.log("Login Function Executed", formData);
        let responseData;
        await fetch("https://e-commerce-mern-stack-6dgz.onrender.com/login", {
            method: "POST",
            headers: {
                Accept: "application/form-data",
                'Content-Type': "application/json",
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json()).then((data) => responseData = data);
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors);
        }
    }

    const signup = async () => {
        console.log("Sign Up Function Executed", formData);
        let responseData;
        await fetch("https://e-commerce-mern-stack-6dgz.onrender.com/signup", {
            method: "POST",
            headers: {
                Accept: "application/form-data",
                'Content-Type': "application/json",
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json()).then((data) => responseData = data);
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors);
        }
    }

    return (
        <div className='loginsignup'>

            <div className='loginsignuo-container'>
                <h1> {state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Passowrd' />
                </div>
                <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>

                {state === "Sign Up" ?
                    <p className="loginsignup-login">
                        Already have an account?
                        <span onClick={() => { setState("Login") }} style={{ color: "coral", cursor: "pointer" }}> Login here </span> </p>
                    :
                    <p className="loginsignup-login">
                        Create an account!
                        <span onClick={() => { setState("Sign Up") }} style={{ color: "coral", cursor: "pointer" }}> Click here </span> </p>
                }

                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p> I agree to the terms of use & privecy policy.</p>

                </div>

            </div>
        </div>
    )
}

export default LoginSignup
