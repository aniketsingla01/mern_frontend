import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SignUp from './axioss/SignUp';
import GProfile from './axioss/GProfile';
import Login from './axioss/LogIn';
import GAvailProducts from './axioss/GAvailProducts';
import GItemsManager from './axioss/GItemsManager';
import { BrowserRouter } from 'react-router-dom';
import GrowerDashBoard from './axioss/GrowerDashBoard';
import ConsumerDashBoard from './axioss/ConsumerDashBoard';
import HomePage from './axioss/HomePage';
import FindGrowers from './axioss/FindGrowers';
import CProfile from './axioss/CProfile';
import { Route, Routes, useNavigate } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      {/* <SignUp></SignUp> */}
      {/* <GProfile></GProfile> */}
      {/* <Login></Login> */}
      {/* <GAvailProducts></GAvailProducts> */}
      {/* <GItemsManager></GItemsManager> */}
      
      {/* <GrowerDashBoard></GrowerDashBoard> */}
      {/* <ConsumerDashBoard></ConsumerDashBoard> */}
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/gprofile" element={<GProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gavail" element={<GAvailProducts />} />
        <Route path="/gitems" element={<GItemsManager />} />
        <Route path="/growerdashboard" element={<GrowerDashBoard />} />
        <Route path="/consumerdashboard" element={<ConsumerDashBoard />} />
        <Route path="/fgrowers" element={<FindGrowers />} />
        <Route path="/cprofile" element={<CProfile />} />
      </Routes>
      {/* <FindGrowers></FindGrowers> */}
      {/* <CProfile></CProfile> */}
    </BrowserRouter>

  </>
);
