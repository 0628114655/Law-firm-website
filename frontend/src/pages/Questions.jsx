import React from 'react'
import { useState, useEffect } from 'react'
import {FaPlus, FaMinus  } from "react-icons/fa";


function Questions() {

    const [questions, setQuestions] = useState([])
    const [openIndex, setopenIndex] = useState(null)
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)


    const toggleIndex = (index)=>{
        setopenIndex(openIndex === index ? null : index)
    }

    useEffect( () =>{
        const getQuestion = async () => {
            try{
            let response =  await fetch ('/Questions/')
            let data = await response.json()
            setQuestions(data)
            }
            catch(e){
                setError(e.message)

            }
            finally{
            setLoading(false)

            }

            
        }
        getQuestion()}, [] )


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
          }, [questions]);


  return (
      <div  className='container raya-container'>
            {error ? <p className='text-danger d-flex justify-content-center align-items-center'> حدث خطأ أثناء تحميل المشاريع: {error}</p>:
            loading ? ( <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">جارٍ التحميل...</span>
                            </div>
                        </div>) :
                        <>
                        <h3 className='element'>الأسئلة المتكررة</h3>
                        {
                        questions.map((q,index) =>(
                                <div key={index} className='questions-box element'>
                                    <h6 className="btn btn-primary d-flex justify-content-between align-items-center questions-button w-100" style={{cursor:'pointer'}} onClick={()=>toggleIndex(index)}> {q.question} <span>{openIndex===index? (<i>< FaMinus className='minusIcon '/></i>):(<i> < FaPlus  className='plusIcon '/></i>) }</span>     </h6>

                                    {openIndex === index && (
                                        <div className="card card-body anwser-box">
                                        {q.answer}
                                        </div>
                                    )}
                                    
                                </div>
                        ))
                                    }
                        {questions.length === 0 && <p>لا توجد أسئلة متوفرة حالياً.</p>}
                        </>}

    </div>
  )
}

export default Questions