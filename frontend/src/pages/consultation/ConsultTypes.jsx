import React from 'react'
import * as Icons from 'react-icons/md';
import * as icons from 'react-icons/fa';
import * as icon from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'




function ConsultType() {
  const [showModal, setShowModal] = useState(false)
  const [consultType, setConsultType] = useState(null)

  const HandleOpenModal= (type) =>  {
    setShowModal(true)
    setConsultType(type)
  }
  const HandleCloseModal= () =>  {
    setShowModal(false)
  }

  useEffect(() => {
    const initObserver = () => {
      const buttons = document.querySelectorAll('.raya-container .element');
      if (buttons.length === 0) return false;
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Array.from(buttons).indexOf(entry.target);
              entry.target.style.transitionDelay = `${index * 0.1}s`;
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
  
      buttons.forEach((btn) => observer.observe(btn));
      return true;
    };
  
    // محاولة التنفيذ فوراً
    if (initObserver()) return;
  
    // إذا فشل، نستخدم MutationObserver لانتظار العناصر
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        if (initObserver()) {
          mutationObserver.disconnect();
        }
      });
    });
  
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  
    return () => mutationObserver.disconnect();
  }, []);

  return (
    <>
    <div className='container'>
      <div className="row raya-container">
        <h3 className='m-2 p-1 mb-4'>طلب استشارة</h3>
        <div className="col btn element" > < Icons.MdOutlineTextSnippet size={30} className='icon mb-2 icon-blue'/> <h4 className='d-inline'> استشارة مكتوبة </h4>
          <div className='p-3 writed'>
            <span className='text-end d-block m-1'>السعر: 100.00 درهم</span>
            <span className='text-end d-block m-1'>المدة: 24 ساعة</span>
            <button className='btn btn-outline-primary' onClick={()=>HandleOpenModal('استشارة مكتوبة')}>اطلب الآن</button>
          </div>
        </div>
        <div className="col btn element" > < Icons.MdCall size={30} className='icon mb-2 icon-blue'/> <h4 className='d-inline'>  استشارة عبر مكالمة هاتفية </h4>
          <div className='p-3'>
            <span className='text-end d-block m-1'>السعر: 150.00 درهم</span>
            <span className='text-end d-block m-1'>المدة: 24 ساعة</span>
            <button className='btn btn-outline-primary'  onClick={()=>HandleOpenModal('استشارة عبر مكالمة هاتفية ')}>اطلب الآن</button>
          </div>
         </div>
        <div className="col btn element" > < Icons.MdVideoCall size={30} className='icon mb-2 icon-blue'/> <h4 className='d-inline'> استشارة عبر مقابلة مرئية   </h4>
          <div className='p-3'>
            <span className='text-end d-block m-1'>السعر: 200.00 درهم</span>
            <span className='text-end d-block m-1'>المدة: 24 ساعة</span>
            <button className='btn btn-outline-primary' onClick={()=>HandleOpenModal('استشارة عبر مقابلة مرئية ')}>اطلب الآن</button>
          </div>
        </div>

      </div>
      {showModal&&(
        <div className="modal-backdrop-custom">
          <div className="modal-custom">
            <h4>اختر طريقة الدفع المناسبة</h4>
            <p>لقد اخترت: {consultType} </p>
            <Link to={`/ExternalPaymentConsultation/${consultType}/external`}  className='btn btn-outline-success w-100 my-2'><icon.FaMoneyBillTransfer/> الدفع بواسطة تحويل بنكي </Link >
            <Link to={`/ExternalPaymentConsultation/${consultType}/internal`} className='btn btn-outline-primary w-100 my-2'><icons.FaPaypal/> الدفع الآمن بواسطة بوابة الدفع </Link>
            <button className='btn btn-outline-secondarya w-100 my-2' onClick= {()=>HandleCloseModal()}> إغلاق </button>
          </div>
        </div>
      )  }
    </div>
    </>
  )

}
export default ConsultType