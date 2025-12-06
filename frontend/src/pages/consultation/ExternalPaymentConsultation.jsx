import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'




function ExternalPaymentConsultion() {
  const {consultType, method} = useParams()
  const [error, setError] = useState()
  const [fullName, setFullName] = useState('')
  const [numberPhone, setNumberPhone] = useState('')
  const [consultationSubject, setConsultationSubject] = useState('')
  const [consultationContent, setConsultationContent] = useState('')
  const [paymentImg, setPaymentImg] = useState()
  const navigate = useNavigate()


  const formData = new FormData();
  formData.append("fullName", fullName);
  formData.append("numberPhone", numberPhone);
  formData.append("consultationSubject", consultationSubject);
  formData.append("consultationContent", consultationContent);
  if (method === 'external'){formData.append("paymentImg", paymentImg);}
   

  const sendConsultation = async (e)=>{
    e.preventDefault()
    try{
      const response = await fetch('/legalConsultation/',{
      method: 'POST',
      body: formData  
      }
      )
      const resp = await fetch('/RegisterView/',{
      method: 'POST',
      body: formData  
      }
      )
      if (!response.ok){
        throw new Error("حدث خطأ أثناء إرسال الرسالة");
      } 
      window.alert('لقد تم إرسال الرسالة بنجاح. ستتوصلون بالرد خلال أقل من 24 ساعة.')
      setFullName('')
      setNumberPhone('')
      setConsultationContent('')
      setConsultationSubject('')
      setPaymentImg()
      navigate('/ConsultType/')
      
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
    <div className='container raya-container'>
      <h3 className='element'> {consultType} </h3>
                        {method==='external' &&
                          <strong className='text-center d-block element'> رقم الحساب البنكي (RIB) : 3143410055326560007642342242 </strong>}
                        <form action="" onSubmit={sendConsultation}>
                            <div className="my-3 element">
                              <label className="form-label"> الاسم الكامل </label>
                              <input onChange={(e)=> {setFullName(e.target.value)}} type="text" className='form-control' value={fullName} id="" required />
                            </div>

                            <div className="my-3 element">
                              <label className="form-label"> رقم الهاتف  </label>
                              <input onChange={(e)=> {setNumberPhone(e.target.value)}} type="number" className='form-control' value={numberPhone} id="" required/>
                            </div>

                            <div className="my-3 element">
                              <label className="form-label">  موضوع الاستشارة  </label>
                              <input onChange={(e)=> {setConsultationSubject(e.target.value)}} type="text" className='form-control' value={consultationSubject} id="" required/>
                            </div>

                            <div className="my-3 element">
                              <label className="form-label">  محتوى الاستشارة  </label>
                              <textarea onChange={(e)=> {setConsultationContent(e.target.value)}} type="text" className='form-control' value={consultationContent} id="" required/>
                            </div>

                            {method==='external' &&
                                <div className="my-3 element">
                                  <label className="form-label">   وصل الأداء  </label>
                                  <input onChange={(e)=> {setPaymentImg(e.target.files[0])}} type="file" className='form-control'  id="" required/>
                                </div>
                            }                     

                            <div className='w-100 d-flex justify-content-end element'>
                              <button className='btn btn-outline-success' type='submit'> إرسال </button>
                            </div>

                        </form>

                        {error && 
                        <div className='aler alert-danger mt-3' role="alert">{error}</div>
                        }

                        


    </div>
  )
}

export default ExternalPaymentConsultion