import EntranceView from "./pages/publicPages/EntranceView/EntranceView";
import UserInfoView from "./pages/userPages/userInfoView/userInfoView";
import {Route, Routes, Navigate} from "react-router-dom";
import MenuView from "./pages/publicPages/MenuView/MenuView";
import AboutUsView from "./pages/publicPages/AboutUsView/AboutUsView";
import AddOrderForm from "./pages/publicPages/AddOrderForm/AddOrderForm";
import SelectRestaurantView from "./pages/publicPages/SelectRestaurantView/SelectRestaurantView";
import PaypalSuccess from "./pages/publicPages/PaypalViews/PaypalSuccess";
import OAuthCallback from "./components/publicComponents/OAuthCallbackComponent/OAuthCallback";
import MainView from "./pages/publicPages/MainView/MainView";
import OrderDetailsView from "./pages/userPages/orderDetailsView/OrderDetailsView";


const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
}

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/welcome" />;
};

function App() {
  return (
    <Routes>
        <Route path="/" element={<MainView />}/>
        <Route path="/welcome" element={<EntranceView />}/>
        <Route path="/my-info" element={<PrivateRoute><UserInfoView/></PrivateRoute>}/>
        <Route path="/menu" element={<MenuView/>}/>
        <Route path="/about-us" element={<AboutUsView/>}/>
        <Route path="/select-restaurant" element={<SelectRestaurantView/>}/>
        <Route path="/order-form" element={<AddOrderForm/>}/>
        <Route path="/paypal/success" element={<PaypalSuccess/>}/>
        <Route path="/auth/callback" element={<OAuthCallback/>}/>
        <Route path="/order/:id" element={<OrderDetailsView/>}/>
    </Routes>
  );
}

export default App;
