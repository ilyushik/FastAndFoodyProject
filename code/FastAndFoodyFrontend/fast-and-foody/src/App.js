import UserMainView from "./pages/userPages/userMainView/UserMainView";
import EntranceView from "./pages/publicPages/EntranceView";
import UserInfoView from "./pages/userPages/userInfoView/userInfoView";
import UserEditInfoView from "./pages/userPages/userEditInfoView/userEditInfoView";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserMainView />}/>
      <Route path="/welcome" element={<EntranceView />}/>
      <Route path="/my-info" element={<UserInfoView/>}/>
      <Route path="/my-info/edit" element={<UserEditInfoView/>}/>
    </Routes>
  );
}

export default App;
