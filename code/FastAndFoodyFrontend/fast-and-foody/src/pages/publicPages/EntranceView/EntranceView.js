import "./EntranceView.css"

import logo from "../../../images/logo_crop.png"
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

export default function EntranceView() {

    const [formType, setFormType] = useState('LogIn')

    const [name,setName] = useState('')
    const [surname, setSurname] = useState('')
    const [usernameInput, setUsernameInput] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const navigate = useNavigate()

    const [error, setError] = useState({})

    const nameHandler = (e) => {
        setName(e.target.value)
    }

    const surnameHandler = (e) => {
        setSurname(e.target.value)
    }

    const usernameHandler = (e) => {
        setUsernameInput(e.target.value)
    }

    const phoneHandler = (e) => {
        setPhone(e.target.value)
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const passwordHandler = (e) => {
        setPasswordInput(e.target.value)
    }

    const loginHandler = async (e) => {
        e.preventDefault()

        if (usernameInput.trim().length < 1) {
            setError({username: 'Field should not be empty'})
            return
        }
        if (passwordInput.trim().length < 1) {
            setError({password: 'Field should not be empty'})
            return
        }

        const loginData = {
            username: usernameInput,
            password: passwordInput,
        }

        console.log(loginData)

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_LINK}/login`, loginData)
            console.log(response.data)
            localStorage.setItem("token", response.data.token)
            navigate("/")
        } catch (e) {
            console.log(e.response?.data)
            setError(e.response?.data)
        }
    }

    const googleLogin = () => {
        console.log("Login with Google");
        window.location.href = `${process.env.REACT_APP_BACKEND_LINK}/oauth2/authorization/google`
    }

    return (
        <div className="entranceView-container">
            <div className="entranceView-back"></div>

            <div className="entranceView-content">
                <div className="entranceView-block">
                    <div className="entranceView-block-info" style={{"width": "100%"}}>
                        <div className="entranceView-block-info-image-block">
                            <img src={logo} className="entranceView-logo" alt="" />
                        </div>

                        <div className="google-login-block">
                            <div className="google-login-button" onClick={() => googleLogin()}>
                                <FaGoogle className="google-login-button-image"/>
                                <p className="google-login-button-text">Login with google</p>
                            </div>
                        </div>
                        {/*{formType === "LogIn" && (*/}
                        {/*    <div className="entranceView-block-info-form">*/}
                        {/*        <p className="entranceView-block-info-form-title">Log in</p>*/}

                        {/*        <form style={{"width": "100%"}} onSubmit={loginHandler}>*/}
                        {/*            <div className="entranceView-block-info-form-input-block">*/}
                        {/*                <input className="entranceView-block-info-form-input" placeholder="Username" type="text" value={usernameInput} onChange={usernameHandler} />*/}
                        {/*            </div>*/}
                        {/*            {error?.username && (<p className="loginInputError">{error.username}</p>)}*/}

                        {/*            <div className="entranceView-block-info-form-input-block">*/}
                        {/*                <input className="entranceView-block-info-form-input" placeholder="********" type="password" value={passwordInput} onChange={passwordHandler} />*/}
                        {/*            </div>*/}
                        {/*            {error?.password && (<p className="loginInputError">{error.password}</p>)}*/}

                        {/*            <div className="entranceView-block-info-form-button-block">*/}
                        {/*                <button className="entranceView-block-info-form-button" type="submit">Continue</button>*/}
                        {/*            </div>*/}
                        {/*        </form>*/}

                        {/*        <div className="entranceView-block-info-additional-button-block">*/}
                        {/*            <button className="entranceView-block-info-additional-button" onClick={() => setFormType("Registration")}>I have no account</button>*/}
                        {/*        </div>*/}

                        {/*        <div className="entranceView-block-info-additional-button-block" onClick={() => setFormType("ResetPassword")}>*/}
                        {/*            <button className="entranceView-block-info-additional-button">I forgot my password</button>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*)}*/}

                        {/*{formType === "Registration" && (*/}
                        {/*    <div className="entranceView-block-info-form">*/}
                        {/*        <p className="entranceView-block-info-form-title">Registration</p>*/}

                        {/*        <form style={{"width": "100%"}}>*/}
                        {/*            <div className="entranceView-block-info-form-input-block">*/}
                        {/*                <input className="entranceView-block-info-form-input" placeholder="Name" type="text" value={name} onChange={nameHandler} />*/}
                        {/*            </div>*/}

                        {/*            <div className="entranceView-block-info-form-input-block">*/}
                        {/*                <input className="entranceView-block-info-form-input" placeholder="Surname" type="text" value={surname} onChange={surnameHandler} />*/}
                        {/*            </div>*/}

                        {/*            <div className="entranceView-block-info-form-input-block">*/}
                        {/*                <input className="entranceView-block-info-form-input" placeholder="Username" type="text" value={usernameInput} onChange={usernameHandler} />*/}
                        {/*            </div>*/}

                        {/*            <div className="entranceView-block-info-form-input-block">*/}
                        {/*                <input className="entranceView-block-info-form-input" placeholder="Phone" type="text" value={phone} onChange={phoneHandler} />*/}
                        {/*            </div>*/}

                        {/*            <div className="entranceView-block-info-form-input-block">*/}
                        {/*                <input className="entranceView-block-info-form-input" placeholder="Email" type="email" value={email} onChange={emailHandler} />*/}
                        {/*            </div>*/}

                        {/*            <div className="entranceView-block-info-form-input-block">*/}
                        {/*                <input className="entranceView-block-info-form-input" placeholder="********" type="password" value={passwordInput} onChange={passwordHandler} />*/}
                        {/*            </div>*/}

                        {/*            <div className="entranceView-block-info-form-button-block">*/}
                        {/*                <button className="entranceView-block-info-form-button" type="submit">Registration</button>*/}
                        {/*            </div>*/}
                        {/*        </form>*/}

                        {/*        <div className="entranceView-block-info-additional-button-block">*/}
                        {/*            <button className="entranceView-block-info-additional-button" onClick={() => setFormType("LogIn")}>I already have an account</button>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*)}*/}

                        {/*{formType === "ResetPassword" && (*/}
                        {/*    <div className="entranceView-block-info-form">*/}
                        {/*        <p className="entranceView-block-info-form-title">Reset password</p>*/}

                        {/*        <form style={{"width": "100%"}}>*/}
                        {/*            <div className="entranceView-block-info-form-input-block">*/}
                        {/*                <input className="entranceView-block-info-form-input" placeholder="Username" type="text" value={usernameInput} onChange={usernameHandler} />*/}
                        {/*            </div>*/}

                        {/*            <div className="entranceView-block-info-form-button-block">*/}
                        {/*                <button className="entranceView-block-info-form-button" type="submit">Continue</button>*/}
                        {/*            </div>*/}
                        {/*        </form>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </div>
                </div>
            </div>
        </div>
    )
}