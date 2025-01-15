import UserMainView from "./pages/userPages/userMainView/UserMainView";
import EntranceView from "./pages/publicPages/EntranceView/EntranceView";
import UserInfoView from "./pages/userPages/userInfoView/userInfoView";
import UserEditInfoView from "./pages/userPages/userEditInfoView/userEditInfoView";
import {Route, Routes} from "react-router-dom";
import MenuView from "./pages/publicPages/MenuView/MenuView";

function App() {
  return (
    <Routes>
        <Route path="/" element={<UserMainView />}/>
        <Route path="/welcome" element={<EntranceView />}/>
        <Route path="/my-info" element={<UserInfoView/>}/>
        <Route path="/my-info/edit" element={<UserEditInfoView/>}/>
        <Route path="/menu" element={<MenuView/>}/>
    </Routes>
  );
}

export default App;
