import './App.css';
import {Route, Routes} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import AccountChange from './Pages/AccountChange';
import AccountProfile from './Pages/AccountProfile';
import LarpPageSearch from './Pages/LarpPageSearch';
import LarpBuilderPage from './Pages/LarpBuilderPage';
import LarpChangePage from './Pages/LarpChangePage';
import LarpPage from './Pages/LarpPage';
import AccountAdminManagement from './Pages/AccountAdminManagement';
import LarpAdminManagement from './Pages/LarpAdminManagement';


function App() {


  return (
    <div className="App">
      <header >
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/registration" element={<RegistrationPage/>}/>
          <Route path="/larppagesearch" element={<LarpPageSearch/>}/>
          <Route path="/accountchange" element={<AccountChange/>}/>
          <Route path="/accountprofile" element={<AccountProfile/>}/>
          <Route path="/registration" element={<RegistrationPage/>}/>
          <Route path="/larpbuilderpage" element={<LarpBuilderPage/>}/>
          <Route path="/larpchangepage" element={<LarpChangePage/>}/>
          <Route path="/larppage" element={<LarpPage />}/>
          <Route path="/accountadminmanagement" element={<AccountAdminManagement />}/>
          <Route path="/larpadminmanagement" element={<LarpAdminManagement />}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
