
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Import components one by one and test rendering
import Home from './components/Home';
import Login from './components/Farmer/Login';
import Register from './components/Farmer/Register';
import WeatherApi from './components/API/WeatherApi';
import BuyerDashboard from './components/Buyer/BuyerDashboard';
import BLogin from './components/Buyer/BLogin';
import BRegister from './components/Buyer/BRegister';
import MasterDashboard from './components/Farmer/MasterDashboard';
import Market from './components/Farmer/Market';
import BuyCrops from './components/Buyer/BuyCrops';
import RazorpayPayment from './components/Payment/RazorpayPayment';
import {Location} from './components/LocationProvider/Location';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/weather" element={<WeatherApi />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
        <Route path="/blogin" element={<BLogin />} />
        <Route path="/bregister" element={<BRegister />} />
        <Route path="/mdb" element={<MasterDashboard />} />
        <Route path="/market" element={<Market />} />
        <Route path="/buy" element={<BuyCrops/>}/>
        <Route path="/payment" element={<RazorpayPayment/>}/>
        <Route path="/location" element={<Location/>}/>
      </Routes>
    </Router>
  );
}

export default App;