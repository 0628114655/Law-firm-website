import React from 'react'
import { useState, useEffect } from "react";
import * as Icons from 'react-icons/fa';



function Pricing() {
    const [pricing, setPricing ] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    
    function Prices({ prices }) {
        const [showAll, setShowAll] = useState(false);
    
        return (
            <div >
                <h4 className='d-flex justify-content-center fw-bold '>الخطة: {prices.plan.title}</h4>
                
                    {prices.description
                        .slice(0, showAll ? prices.description.length : 10)
                        .map((feature) => {
                            const PriceIcon = feature.icon ? Icons[feature.icon] : null;
                            return (
                                <div key={feature.id} className='PricingFeature d-flex align-items-center mb-2'>
                                    {PriceIcon && <span className="me-2 mx-2"><PriceIcon color={prices.plan.color === '#FFD700' ? '#fff' : '#222'} /></span>}
                                    {feature.description}
                                </div>
                            );
                        })}
    
                <div className="text-center mt-2">
                    {!showAll && prices.description.length > 10 && (
                        <button className='btn btn-outline-dark mt-2 mb-5' onClick={() => setShowAll(true)}>
                            شاهد المزيد ...
                        </button>
                    )}
                    {showAll && (
                        <button className='btn btn-outline-secondary mt-2 mb-5' onClick={() => setShowAll(false)}>
                            عرض أقل
                        </button>
                    )}
                </div>
    
            </div>
        );
    }
    
    useEffect(() =>{
        const getPrices =  async () => {
            try{
            let response = await fetch('/Pricing/')
            let data = await response.json()
            console.log('data is',data)
            setPricing(data)

            }
            catch(e){
                setError(e.message)
            }
            finally{
            setLoading(false)
            }
        }
        getPrices()
        }, [])
  return (
    <div  className='container'>
    {error ? <p className='text-danger d-flex justify-content-center align-items-center'> حدث خطأ أثناء تحميل المشاريع: {error}</p>:
     loading ? ( <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">جارٍ التحميل...</span>
                    </div>
                </div>) :
                <>
            <h3>التسعير</h3>
            <h6> نقدم في موقعنا العديد من خطط التسعير المختلفة والتي نطمح من خلالها إلى مساعدتكم على إنشاء موقعكم الإلكتروني بالسعر المناسب </h6>

        <div className='row d-flex justify-content-around p-1'  >
           { pricing.map( p => (
                <div className="col col-lg-4 col-sm-12 col-12 my-3 border p-2 shadow position-relative" >
                <div className="card pricing-card h-100 border-0 shadow" style={{ backgroundColor: `${p.plan.color}33`, border: `2px solid ${p.plan.color}`, borderRadius: '10px' }}>
                    <div className="card-body">
                        <Prices key={p.id} prices={p} />
                    </div>
                    <div className="card-footer text-center bg-transparent border-0">
                        <strong>
                        السعر المبدئي* : {p.price} درهما ({p.price / 10} $)
                        </strong>
                    </div>
                </div>
                </div>
            ))}
               <small>* ملحوظة : الأسعار أعلاه مبدئية ويمكن أن تتغير حسب حجم المشروع ومتطلباته. </small>
        </div> 
        </>
  }
    </div>
    )
}

export default Pricing