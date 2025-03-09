import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const auth = params.get("auth");

        if (auth) {
            localStorage.setItem("token", auth);
            console.log("Redirecting to info page...");
            window.location.href = `${process.env.REACT_APP_FRONTEND_LINK}`
        } else {
            navigate("/");
        }
    }, [navigate]);

    return <p>Logging in...</p>;
};

export default OAuthCallback;