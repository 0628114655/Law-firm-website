import React from 'react'
import { useState,  useEffect } from "react";
import * as Icons from 'react-icons/fa';
import { SiGmail } from "react-icons/si";



function ContactUs() {
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')    
    const [error, setError] = useState()    

 

    const addMessage = async (e) => {
        e.preventDefault(); // منع إعادة تحميل الصفحة
        try{
        const response = await fetch(`/ContactUS/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({FirstName, LastName, email, subject, message})
            },)
        if (!response.ok) {
            throw new Error("حدث خطأ أثناء إرسال الرسالة");
            }
        
        alert("✅ لقد تم إرسال الرسالة بنجاح!");
        setFirstName('')
        setLastName('')
        setEmail('')
        setSubject('')
        setMessage('')
        }
        catch(e){  
                setError(e.message)
        }
    }

    
 useEffect(() => {
    const initObserver = () => {
      const buttons = document.querySelectorAll('.raya-container  .element');
      if (buttons.length === 0) return false;
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Array.from(buttons).indexOf(entry.target);
              entry.target.style.transitionDelay = `${index * 0.1}s`;
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }});},
        { threshold: 0.1 });
  
      buttons.forEach((btn) => observer.observe(btn));
      return true;};
      if (initObserver()) return;
      const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        if (initObserver()) {
          mutationObserver.disconnect();
        }});});
  
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true});
  
    return () => mutationObserver.disconnect();
  }, []);
       

        
  return (
    <div className="container">
        <div className="row raya-container">
            <h3>تواصل معنا</h3>
        
            <div className="col col-12 col-md-6 element m-0 mt-4">
            <form onSubmit={addMessage}>
                        <div className="mb-3">
                            <label className="form-label">الاسم الشخصي</label>
                            <input onChange={(e)=>{setFirstName(e.target.value)}} type="text" value={FirstName} className="form-control"  />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">الاسم العائلي</label>
                            <input onChange={(e)=>{setLastName(e.target.value)}} type="text" value={LastName} className="form-control"  />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"> البريد الإلكتروني</label>
                            <input onChange={(e)=>{setEmail(e.target.value)}} type="email" value={email} className="form-control"  />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">الموضوع</label>
                            <input onChange={(e)=>{setSubject(e.target.value)}} type="text" value={subject} className="form-control"  />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">الرسالة</label>
                            <textarea onChange={(e)=>{setMessage(e.target.value)}}  rows="4" type="text" value={message} className="form-control"  />
                        </div>
                        <button type="submit"  className="btn btn-primary" >إرسال</button>

                  
                    </form>
                    {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}

            </div>
            <div className="col col-12 col-md-6 pt-3 element m-0 mt-4">
                <h4 className='my-4'>تواصل معنا على:</h4>
                <div className='' style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <a href={`https://web.facebook.com/profile.php?id=61567540797013`} target="_blank"  rel="noopener noreferrer" title='صفحتنا على الفيسبوك' > <Icons.FaFacebook className='btn ' style={{fontSize:'4.5rem', color : '#1877F2'}} /> </a>
                    <a href={`https://wa.me/+2120628114655`} target="_blank" rel="noopener noreferrer" title=' التواصل على الواتساب '> <Icons.FaWhatsapp className='btn' style={{fontSize:'4.5rem', color : '#25D366'}} />  </a>
                    <a href={`https://www.linkedin.com/in/web-craft-13a487365/`} target="_blank" rel="noopener noreferrer" title=' صفحتنا على Linked in' ><Icons.FaLinkedin className='btn' style={{fontSize:'4.5rem', color : '#0077B5'}}/>  </a>
                    <a href={`mailto:webcraftmultiservices@gmail.com`} target="_blank" rel="noopener noreferrer" title=' بريدنا الإلكتروني' ><SiGmail className='btn' style={{fontSize:'4.5rem', color : '#EA4335'}}/>  </a>


                </div>


            </div>

        </div>
    </div>
  )
}

export default ContactUs