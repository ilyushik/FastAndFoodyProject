import "./Footer.css"
import logo from "../../../images/logo_crop.png"
import facebook from "../../../images/facebook2.png"
import youtube from "../../../images/youtube2.png"
import twitter from "../../../images/twitter2.png"
import tiktok from "../../../images/Tik_tok_logo.png"
import instagram from "../../../images/instagram2.png"
import mastercard from "../../../images/thumb_1916.png"
import visa from "../../../images/thumb_2165.jpg"

export default function Footer() {
    return (
        <div className="UserFooter">
            <div className="UserFooterRights">
                <img src={logo} className="UserFooterLogo" alt="logo" />
                <p>BIBA AND BOBA CORP.ALL RIGHTS RESERVED 2024©</p>
            </div>

            <div className="UserFooterSocial">
                <img src={facebook} className="UserFooterSocialImage" alt="" />
                <img src={youtube} className="UserFooterSocialImage" alt="" />
                <img src={twitter} className="UserFooterSocialImage" alt="" />
                <img src={tiktok} className="UserFooterSocialImage" alt="" />
                <img src={instagram} className="UserFooterSocialImage" alt="" />
            </div>

            <div className="UserFooterCard">
                <img src={mastercard} className="UserFooterCardImage" alt="" />
                <img src={visa} className="UserFooterCardImage" alt="" />
            </div>
        </div>
    )
}