import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from './components/Register';
import Home from './components/Home';
 // Fixed import (was "Sellerlogin.js")
import SellerRegister from './components/SellerRegister'; // Fixed import (was "Sellerregistration.js")
import WeatherApi from './components/WeatherApi';
import Login from './components/Login';
import Rdashbord from './components/Rdashbord';
import Dashboard from './components/Dashboard';
import PaymentPage from './components/PaymentPage'; // ✅ Fixed import
import SellerLogin from './components/SellerLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/slogin" element={<SellerLogin></SellerLogin>}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sregister" element={<SellerRegister />} />
        <Route path="/weather" element={<WeatherApi />} />
        <Route path="/rdashbord" element={<Rdashbord />} />
        
        {/* ✅ Updated Route to accept query params */}
        <Route path="/payment" element={<PaymentPage />} />

      
      </Routes>
    </Router>
  );
}

export default App;
