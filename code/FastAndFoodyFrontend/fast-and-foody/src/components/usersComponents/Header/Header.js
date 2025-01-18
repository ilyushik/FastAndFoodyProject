import "./Header.css"
import logo from "../../../images/LogoFull.png"
import responsiveIconFalse from "../../../images/menu.png"
import responsiveIconTrue from "../../../images/close_cross.png"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import cart from "../../../images/cart.svg"
import PopupCart from "../../publicComponents/PopupCart/PopupCart";

export default function Header() {
    const [showNavBar, setShowNavBar] = useState(false)
    const navigator = useNavigate()
    const [showCart, setShowCart] = useState(false)

    const responsiveNav = () => {
        if (showNavBar) {
            return (
                <button className="UserHeader-navbar-responsive" onClick={() => setShowNavBar(false)}>
                    <img className="UserHeader-navbar-response-image" src={responsiveIconTrue}/>
                </button>
            )
        } else {
            return (
                <button className="UserHeader-navbar-responsive" onClick={() => setShowNavBar(true)}>
                    <img className="UserHeader-navbar-response-image" src={responsiveIconFalse}/>
                </button>
            )
        }
    }

    return (
        <div className="UserHeader-container">
            <div className="UserHeader-image-container">
                <img className="UserHeader-image" src={logo} onClick={() => navigator('/')}/>
            </div>

            <nav className={`UserHeader-navbar ${showNavBar ? "show-nav" : ""}`}>
                <a className="UserHeader-navbar-button" href="/menu">Menu</a>
                <a className="UserHeader-navbar-button" href="#">About us</a>
                <a className="UserHeader-navbar-button" href="#">Contacts</a>
                <a className="UserHeader-navbar-button" href="/my-info">Account</a>
                {/*<a className="UserHeader-navbar-button" href="#">Add order</a>*/}
                <button className="UserHeader-navbar-button" onClick={() => setShowCart(!showCart)}>Cart</button>
            </nav>

            <div className="responsive-icons">
                <button className="UserHeader-navbar-cart" onClick={() => setShowCart(!showCart)}>
                    <img className="UserHeader-navbar-cart-image" src={cart}/>
                </button>

                {responsiveNav()}
            </div>
            {showCart && (<PopupCart/>)}
        </div>
    )
}