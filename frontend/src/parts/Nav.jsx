import React from 'react'
import { FaHome, FaHandshake, FaBalanceScale, FaEnvelope, FaQuestionCircle, FaBlog ,  FaRegBell, FaBell } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom'
import logo  from '../images/d.jpg'
import { HiOutlineDocumentText } from "react-icons/hi";
import { useState, useEffect } from 'react'






function Nav() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path
  const isActiveSubLinks = (path) => location.pathname.startsWith( path)
  const [notification, setNotification] = useState([""])

  useEffect(() =>{

  const getNotification = async () =>{

      const response = await fetch('/Get_Notification/')
      let data = await response.json()
      setNotification(data)
  }
      getNotification()}, [])

  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary " dir='RTL'>
      <div className="container-fluid">
        
        <img src={logo} className='' style={{width:'80px', height: '80px', border: 'solid gray 0.5px', borderLeft: '2px solid black', borderRadius: '5px', boxShadow: '2px 2px 6px rgba(0,0,0,0.2)' }} alt="الهوية البصرية للموقع" />
        <Link className="navbar-brand"  to={'/'}> <span className="brand-ar">مكتب العدالة للمحاماة </span></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto ">
              <li className="nav-item">
                <Link to={'/'} className={ ` nav-link ${isActive('/') ? "active" : ""} `} > <span> <FaHome /> </span> الرئيسية</Link>
              </li>
              <li className="nav-item">
                <Link to={'AboutUs/'} className={`nav-link ${isActive('/AboutUs/') ? "active" : "" }`} ><span> <FaBalanceScale /> </span> من نحن </Link>
              </li>
              <li className="nav-item">
                <Link to={'services/'} className={`nav-link ${isActive('/services/') ? "active" : "" }`}> <span><FaHandshake /></span> الخدمات</Link>
              </li>
              <li className="nav-item">
                <Link to={'ConsultType/'} className={`nav-link ${isActive('/ConsultType/') ? "active" : "" }`}> <span><HiOutlineDocumentText /></span> استشارة قانونية</Link>
              </li>
              <li className="nav-item">
                <Link to={'blog/'} className={`nav-link ${isActive('/blog/') ? "active" : "" }`} > <span> <FaBlog/> </span>  المدونة</Link>
              </li>
              <li className="nav-item">
                <Link to={'questions/'} className={`nav-link ${isActive('/questions/') ? "active" : ""}`} > <span> <FaQuestionCircle/></span>  الأسئلة المتكررة</Link>
              </li>
              <li className="nav-item">
                <Link  to={'ContactUs/'} className={`nav-link ${isActive('/ContactUs/') ? "active" : ""}`} > <span>  <FaEnvelope/> </span> تواصل معنا</Link>
              </li>
              <li className="nav-item">
                <Link  to={'ContactUs/'} className={`nav-link ${isActive('/ContactUs/') ? "active" : ""}`} > <span>  {notification ? <FaRegBell/> : <FaBell />}    </span> </Link>
              </li>
              

              
              
          </ul>
          
        </div>
      </div>
  </nav>
  )
}

export default Nav;