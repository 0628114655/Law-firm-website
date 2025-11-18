import React from 'react'
import { FaHome, FaBalanceScale, FaHandshake, FaBlog, FaQuestionCircle, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom'


const currentYear = new Date().getFullYear();


function Footer() {
  return (
    <>
        <br />
    <footer className="bg-light mt-5 pt-4 border-top">
        {/* <hr /> */}
    <div className='container'>

        <div className='row'>
            <div className="col-md-4">
                <h5>نبذة عنا </h5>
                <p>
                مكتب محاماة يقدم خدمات قانونية شاملة باحترافية عالية، ملتزمون بالدفاع عن الحقوق وتقديم الاستشارات القانونية الرصينة وفق مبادئ العدالة والنزاهة.        
                 </p>
            </div>

            <div className="col-md-4">

                <h5> روابط سريعة</h5>
                <ul className="list-unstyled">
                    <li className="nav-item">
                        <Link to={'/'} className="nav-link p-0 mb-2" > <span> <FaHome className='text-primary me-2' /> </span> الرئيسية</Link>
                    </li>
                    <li className="nav-item"> 
                        <Link to={'pricing/'} className="nav-link mb-2" ><span> <FaBalanceScale className="text-warning me-2" /> </span> من نحن </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'services/'} className="nav-link mb-2" > <span><FaHandshake className="text-success me-2" /></span> الخدمات</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link mb-2" > <span> <FaBlog className="text-secondary me-2"/> </span>  المدونة</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'questions/'} className="nav-link mb-2" > <span> <FaQuestionCircle className="text-info me-2" /></span>  الأسئلة المتكررة</Link>
                    </li>
                    <li className="nav-item">
                        <Link  to={'ContactUs/'} className="nav-link mb-2" > <span>  <FaEnvelope className="text-danger me-2"/> </span> تواصل معنا</Link>
                    </li>
                </ul>

            </div>

            <div className="col-md-4 mb-4">

                <h5>تواصل معنا</h5>
                <span className='nav-link mb-2' style={{whiteSpace: "nowrap"}}>
                    <FaMapMarkerAlt className='text-danger me-2' /> العنوان: Lorem, ipsum dolor sit amet consectetur <br />
                </span>

                <span className='nav-link mb-2' style={{whiteSpace: 'nowrap'}} >
                    <FaEnvelope className='text-primary me-2' /> البريد الإلكتروني: <a href="mailto:webcraftmultiservices@gmail.com">webcraftmultiservices@gmail.com</a><br />
                </span>

                <span className='nav-link mb-2'>
                     <FaPhoneAlt className="text-success me-2"  /> الهاتف: <a href="https://wa.me/212628114655" target='_blank'> 55 46 11 28 06 212+</a><br />
                </span>

                <span className='nav-link mb-2'>
                     <FaFacebook className="text-primary me-2"/> فيسبوك: <a href="https://web.facebook.com/profile.php?id=61567540797013" target="_blank">WebCraft.dev</a>
                </span>
            </div>
        </div>

        <div className="text-center pb-3 text-muted">
            <p>© <span ></span> Youssef Essaadouny - جميع الحقوق محفوظة</p>
            {currentYear}
        </div>
    </div>
    </footer>
    </>
        
  )
}

export default Footer