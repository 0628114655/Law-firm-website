import React from 'react'
import { useState, useEffect } from "react";
import * as Icons from 'react-icons/fa';





function AboutUs() {
    let [image, setImage] = useState  ()
    let [backgroundimage, setBackgroundimage] = useState  ()
    let [cv, setCv] = useState([''])
    const [bgLoaded, setBgLoaded] = useState(false);




useEffect(() =>{
    const getContent = async () => {
      const [contentRes, imgRes, cvRes] = await Promise.all([fetch("/AboutUs/"),fetch("/BackgroundImages/"), fetch("/CV/")]);
      let data = await contentRes.json()
      data = data[0]
      let content = await cvRes.json()
      let imgData = await imgRes.json()
      const imgUrl = imgData.img.image;
      const img = new Image();
      img.src = imgUrl;
      img.onload = () =>{ setBackgroundimage(imgUrl); setBgLoaded(true)}
      setCv(content)
      if (data.image) {
        const image = new Image();
        image.src = data.image;
        setImage(data.image);
      }
    }  
    getContent()
  }, [])
   
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
}, []);


 








  return (
    <> 
      <div className='container-fluid p-0 position-relative text-white' style={{backgroundImage: `url(${backgroundimage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',opacity: 1}}>
      {bgLoaded ?
              (<div className=' overlay-text p-4 position-relative raya-container' > 
                <div className="row ">
                  <div className="col col-lg-4 col-12 my-2 element mx-0">
                    <img src={image} alt="" className='w-100 personal-img'  />
                  </div>
                  <div className="col col-lg-8 col-12  my-2 " >
                    <h4 className='element  text-center text-dark p-4 pb-0 mb-0' style={{marginBottom : '0px'}}> مكتب العدالة للمحاماة </h4><br />
                    <p className='element text-center text-secondary mb-5 mt-0'> مكنب محاماة بهيئة المحامين أكادير - العيون</p>

                    <ul className="list-unstyled">
                      {cv.map(c=>{
                        const CVIcon = Icons[c.icon]
                        return(
                        <li className='element d-flex justify-content-start mx-auto text-dark my-2' key={c.id} style={{fontSize: 'large'}}> 
                          {CVIcon&& < CVIcon className = "me-2 mx-2" />}
                          <span>{c.content}</span>
                        </li>
                        ) })}
                    </ul>
                  </div>
             
                </div>
              <section className="text-center my-5">
                <h5 className="fw-bold " style={{color : '#1E3A8A'}}>رسالتنا</h5>
                <p className="text-muted w-75 mx-auto">
                  نلتزم بالدفاع عن حقوق موكلينا بكل مهنية ومسؤولية، مع الحرص على تقديم الاستشارات القانونية الدقيقة في مختلف التخصصات.
                </p>
             </section>
              </div>
              )
              :
              (<div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                  <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">جارٍ التحميل...</span>
                  </div>
              </div>)
      }
      
      </div>
    </> 
      


    
  )
}

export default AboutUs