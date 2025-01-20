import UserMainView from "./pages/userPages/userMainView/UserMainView";
import EntranceView from "./pages/publicPages/EntranceView/EntranceView";
import UserInfoView from "./pages/userPages/userInfoView/userInfoView";
import UserEditInfoView from "./pages/userPages/userEditInfoView/userEditInfoView";
import {Route, Routes, Navigate} from "react-router-dom";
import MenuView from "./pages/publicPages/MenuView/MenuView";
import AboutUsView from "./pages/publicPages/AboutUsView/AboutUsView";
import ContactsView from "./pages/publicPages/ContactsView/ContactsView";
import AddOrderForm from "./pages/publicPages/AddOrderForm/AddOrderForm";
import SelectRestaurantView from "./pages/publicPages/SelectRestaurantView/SelectRestaurantView";


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
        <Route path="/" element={<UserMainView />}/>
        <Route path="/welcome" element={<EntranceView />}/>
        <Route path="/my-info" element={<PrivateRoute><UserInfoView/></PrivateRoute>}/>
        <Route path="/my-info/edit" element={<PrivateRoute><UserEditInfoView/></PrivateRoute>}/>
        <Route path="/menu" element={<MenuView/>}/>
        <Route path="/about-us" element={<AboutUsView/>}/>
        <Route path="/contacts" element={<ContactsView/>}/>
        <Route path="/select-restaurant" element={<SelectRestaurantView/>}/>
        <Route path="/order-form" element={<AddOrderForm/>}/>
    </Routes>
  );
}

export default App;
