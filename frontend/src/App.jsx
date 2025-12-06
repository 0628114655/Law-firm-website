import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './App.css';
import  Nav  from "./parts/Nav";
import  Footer  from "./parts/Footer";
import  Home  from "./pages/Home";
import  ServiceList  from "./pages/ServiceList";
import  Questions  from "./pages/Questions";
import  Blog  from "./pages/Blog";
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import { useEffect, useState } from "react";
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import ConsultType from './pages/consultation/ConsultTypes';
import ExternalPaymentConsultation from './pages/consultation/ExternalPaymentConsultation';

function App() {



    return(
        < Router>
                < Nav /> 

        <Routes>
            <Route path='/' element={<Home  />} /> 
            <Route path='/services' element={<ServiceList />}/> 
            <Route path='/questions' element={<Questions />}/> 
            <Route path='/blog' element={<Blog />}/> 
            <Route path='/AboutUs/' element={<AboutUs />}/> 
            <Route path='/ContactUS/' element={<ContactUs />}/> 
            <Route path='/ConsultType/' element={<ConsultType />}/> 
            <Route path='/ExternalPaymentConsultation/:consultType/:method' element={<ExternalPaymentConsultation />}/> 
        </Routes>
        < Footer /> 
        </Router>
    )}

export default App;
