import "./userEditInfoView.css"
import Layout from "../../../components/usersComponents/Layout/Layout";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function UserEditInfoView() {

    const navigator = useNavigate();

    const [user, setUser] = useState({});

    const [imageLink, setImageLink] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');

    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState({});


    const fetchUserHandler = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/my-info`, {})
            console.log(response.data)
            setUser(response.data);
        } catch (e) {
            console.log(e.response.data)
        }
    }, [])

    useEffect(() => {
        fetchUserHandler();
    }, [fetchUserHandler])

    const imageLinkHandler = (event) => {
        setImageLink(event.target.value);
    }

    const nameHandler = (event) => {
        setName(event.target.value);
    }

    const surnameHandler = (event) => {
        setSurname(event.target.value);
    }

    const emailHandler = (event) => {
        setEmail(event.target.value);
    }

    const phoneHandler = (event) => {
        setPhone(event.target.value);
    }

    const usernameHandler = (event) => {
        setUsername(event.target.value);
    }

    const submitHandler = async (event) => {
        if (name.length < 1 && surname.length < 1 && email.length < 1 && phone.length < 1 && username.length < 1 &&
            imageLink.length < 1) {
            setIsFormValid(false);
            return
        }
        setIsFormValid(true);

        const updatedData = {
            name: name.trim().length > 0 ? name : user.name,
            surname: surname.trim().length > 0 ? surname : user.surname,
            email: email.trim().length > 0 ? email : user.email,
            phone: phone.trim().length > 0 ? phone : user.phone,
            username: username.trim().length > 0 ? username : user.username,
            image: imageLink.trim().length > 0 ? imageLink : user.image,
            personPassword: user.personPassword,
        }

        try {
            const response = await axios.post(`http://localhost:8080/my-info/edit`, updatedData,
                {})
            console.log(response.data)
            navigator('/my-info')
        } catch (e) {
            console.log(e.response.data)
            setError(e.response.data);
        }
    }

    return (
        <Layout>
            <div className="userEditInfoView-container">
                <div className="userEditInfoView-content">
                    <div className="userEditInfoView-content-image-block">
                        <img src={user.image} className="userEditInfoView-content-image" />
                    </div>

                    <div className="userEditInfoView-content-info-block">
                        <form className="userEditInfoView-content-info-block-form">
                            {/*name*/}
                            <div className="userEditInfoView-content-info-block-form-input-block">
                                <p className="userEditInfoView-content-info-block-form-input-label">Name:</p>
                                <input className="userEditInfoView-content-info-input" type="text" value={name}
                                       onChange={nameHandler} placeholder={user.name}/>
                            </div>
                            {error.name && (<p className="edit-user-error">{error.name}</p>)}

                            {/*surname*/}
                            <div className="userEditInfoView-content-info-block-form-input-block">
                                <p className="userEditInfoView-content-info-block-form-input-label">Surname:</p>
                                <input className="userEditInfoView-content-info-input" type="text" value={surname}
                                       onChange={surnameHandler} placeholder={user.surname}/>
                            </div>
                            {error.surname && (<p className="edit-user-error">{error.surname}</p>)}

                            {/*email*/}
                            <div className="userEditInfoView-content-info-block-form-input-block">
                                <p className="userEditInfoView-content-info-block-form-input-label">Email:</p>
                                <input className="userEditInfoView-content-info-input" type="text" value={email}
                                       onChange={emailHandler} placeholder={user.email}/>
                            </div>
                            {error.email && (<p className="edit-user-error">{error.email}</p>)}

                            {/*phone*/}
                            <div className="userEditInfoView-content-info-block-form-input-block">
                                <p className="userEditInfoView-content-info-block-form-input-label">Phone:</p>
                                <input className="userEditInfoView-content-info-input" type="text" value={phone}
                                       onChange={phoneHandler} placeholder={user.phone}/>
                            </div>
                            {error.phone && (<p className="edit-user-error">{error.phone}</p>)}

                            {/*username*/}
                            <div className="userEditInfoView-content-info-block-form-input-block">
                                <p className="userEditInfoView-content-info-block-form-input-label">Username:</p>
                                <input className="userEditInfoView-content-info-input" type="text" value={username}
                                       onChange={usernameHandler} placeholder={user.username}/>
                            </div>
                            {error.username && (<p className="edit-user-error">{error.username}</p>)}

                            {/*image*/}
                            <div className="userEditInfoView-content-info-block-form-input-block">
                                <p className="userEditInfoView-content-info-block-form-input-label">Image:</p>
                                <input className="userEditInfoView-content-info-input" type="text" value={imageLink}
                                       onChange={imageLinkHandler} placeholder={user.image}/>
                            </div>
                            {error.image && (<p className="edit-user-error">{error.image}</p>)}
                        </form>

                        <div className="userEditInfoView-content-info-block-button-block">
                            <button className={`userEditInfoView-content-info-block-button`} onClick={submitHandler}>
                                Update profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}