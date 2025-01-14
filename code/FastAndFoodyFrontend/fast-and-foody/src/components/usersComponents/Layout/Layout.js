import "./Layout.css"
import Header from "../Header/Header";

export default function Layout({children}) {
    return (
        <div className="Layout">
            <div className="Layout-background"></div>

            <div className="Layout-container">
                <Header />

                <div className="Layout-block">
                    <div className="Layout-content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}