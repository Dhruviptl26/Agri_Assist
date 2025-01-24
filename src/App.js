import './App.css';
 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from './components/Register';
import Dashbord from './components/Dashbord';
import Home from './components/Home';
import SellerLogin from './components/Sellerlogin';
import SellerRegister from './components/Sellerregistration';
import Login from '../components/Login';
import WetherApi from './components/WetherApi';
function App() {
  return (
    <Router>
      <Routes>

        <Route path="/*" element={<Home></Home>}></Route>
      <Route path ="/login" element={<Login></Login>}></Route>
   <Route path="/slogin" element={<SellerLogin></SellerLogin>}></Route>
      <Route path ="/register" element={<Register></Register>}></Route>
      <Route path ="/dashbord" element={<Dashbord></Dashbord>}></Route>
      <Route path ="/sregister" element={<SellerRegister></SellerRegister>}></Route>
      <Route path ="/WetherApi" element={<WetherApi></WetherApi>}></Route>
      </Routes>
     
    </Router>
  );
  //routing 
}

export default App;
