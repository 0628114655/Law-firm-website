import React from 'react'
import { useState, useEffect } from "react";
import * as Icons from 'react-icons/fa';
import { FiChevronUp as ScrollArrow}  from 'react-icons/fi';

import { Link } from 'react-router-dom'




function Home() {

  function Services({ serviceIcon, content, title }) {
    const IconComponent = Icons[serviceIcon]; 
    return (
      <div className=' '>
          <h4> <IconComponent  title= {title} className='icon home-service-icon mb-2 icon-blue '/> {title} </h4>
          <small className='d-block text-align-justify'>{content.slice(0,100)}...</small>
      </div>  
  
  
    )
  }
 

  let [content, setContent] = useState  ([])
  let [backgroundimage, setBackgroundimage] = useState  ()
  const [services, setServices] =  useState ([])
  const [bgLoaded, setBgLoaded] = useState(false);
  const [showScroll, setShowScroll] = useState(false);



useEffect(() =>{
    const getContent = async () => {
      const [contentRes, imgRes] = await Promise.all([fetch("http://192.168.91.1:8000/"),fetch("/BackgroundImages/")]);
      let data = await contentRes.json()
      let imgData = await imgRes.json()
      const imgUrl = imgData.img.image;

      const img = new Image();
      img.src = imgUrl;
      img.onload = () =>{ setBackgroundimage(imgUrl); setBgLoaded(true)}
      setContent(data)
    }  
    getContent()
  }, [])

useEffect ( () => {
    const getService =  async () =>{
      try{
        let response = await fetch('/services/')
        let data = await response.json() 
        setServices(data)
      }
      catch (error) {
        console.log(`Failed to fetch services${error}`)
      }
}
 getService()}, [] )
 
 useEffect(() => {
  const initObserver = () => {
    const buttons = document.querySelectorAll('.subTitleCont .btn');
    const btns = document.querySelectorAll('.mosquira-container .service');

    if (buttons.length === 0) return false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(buttons).indexOf(entry.target);
            const inx = Array.from(btns).indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.1}s`;
            entry.target.style.transitionDelay = `${inx * 0.1}s`;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    buttons.forEach((btn) => observer.observe(btn));
    btns.forEach((button) => observer.observe(button));
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

useEffect(()=>{
  const handleScroll = ()=>{
    if (window.scrollY >= 480 )
      {setShowScroll(true)}
    else {
      setShowScroll(false);
      }
  }
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
},
[])

const scrollToTop = ()=> {
    window.scroll({
        left: 0,
        top: 0,
        behavior:"smooth"})
  }




  return (
    <> 
      <div className='container-fluid p-0 position-relative text-white' style={{backgroundImage: `url(${backgroundimage})`,backgroundSize: 'cover',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',opacity: 1}}>
      {bgLoaded ?
              (<div className=' overlay-text p-4 position-relative mosquira-container' > 
              {
                content.map(cont =>
                  <div className=' p-2 m-1 mx-4 ' key={cont.id}>
                    <h3 className='service'>{cont.title}</h3>
                    <p className='intro service'>{cont.content}</p>
                  </div>)
              }
                <a href="https://wa.me/+2120628114655" className='btn  btn-outline-success home-card-btn  d-flex align-items-center justify-content-center gap-2 mt-5 ' target='blank'> <Icons.FaWhatsapp size={20}/><span style={{fontSize: '1.1rem'}}>تواصل معنا الآن</span> </a>
                {showScroll &&
                  <button className='btn  btn-dark bg-secondary scroll-bar  gap-2 mt-5' onClick={()=> scrollToTop()}> <ScrollArrow size={30}/> </button>
                }
                <a href="https://wa.me/+2120628114655" className='btn  btn-success whatsapp-icon gap-2 mt-5' title='تواصل معنا' target='blank' > <Icons.FaWhatsapp size={30}/> </a>

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
    {bgLoaded&&(
    <div className='container '>
      
      <div className='my-5 subTitleCont'>
          <h3 className='subTitle icon-blue'> <Icons.FaBalanceScale className=' mb-2' /> خدماتنا</h3>
          <div className='row d-flex align-items-start mt-3  mx-1' >
                {services.map( (s, index )=>{
                return  index < 3 ?(
                                <div className="col home-square btn col-md-4 col-12 col-sm-6 flex flex-col items-center text-center gap-2 p-3 my-2" key={s.id}> 
                                  <Services size={30} color={s.color} content={s.content} serviceIcon = {s.icon} title = {s.title} />
                                </div>
                                )
                              :index === 3 && (
                                  <Link to={'services/'} className="col btn home-square col-12 d-flex flex-col items-center  text-center gap-2 p-1 my-2 see-more" key="see-more">
                                      <h4 className='w-100'> <Icons.FaEllipsisH className='icon home-service-icon mb-2 icon-blue '  title='شاهد المزيد' />  خدمات أخرى </h4>
                                  </Link>
                                )
                              })}
          </div>
      </div>  

      <div className='my-5 subTitleCont'>
          <h3 className='subTitle icon-blue '> <Icons.FaUniversity  className='mb-2 icon-blue'/> مجالات اشتغال المكتب </h3>
          <div className='row d-flex  justify-content-center align-items-start mx-1' >
                                <div className="col home-square btn col-md-3 col-6 col-sm-4 flex flex-col items-center text-center gap-2 p-2 my-2" >                                  
                                  <h4>  <Icons.FaBalanceScale size={30} className="mb-2 icon-blue mx-1"  title='القضايا المدنية' />القضايا المدنية</h4>
                                  <p  className="text-gray-600 text-sm ">نترافع في مختلف المنازعات المدنية بما في ذلك التعويضات، العقود المدنية، المسؤولية التقصيرية... مع الحرص على إيجاد حلول قانونية فعالة تحفظ حقوق الموكلين وتضمن العدالة.</p>
                                </div>
                                <div className="col home-square btn col-md-3 col-6 col-sm-4 flex flex-col items-center text-center gap-2 p-2 my-2" >                                  
                                    <h4><Icons.FaHeart size={30} className="mb-2 icon-blue"  title=' القضايا الأسرية'/>  القضايا الأسرية </h4>
                                    <p  className="text-gray-600 text-sm">نولي القضايا الأسرية عناية خاصة، سواء المتعلقة بالزواج،الطلاق، النفقة،الحضانة، مع مراعاة الجوانب الإنسانية والاجتماعية التي تميز هذا النوع من النزاعات.</p>
                                </div>
                                <div className="col home-square btn col-md-3 col-6 col-sm-4 flex flex-col items-center text-center gap-2 p-2 my-2" >                                  
                                    <h4><Icons.FaHome size={30} className="mb-2 icon-blue"  title='القضايا العقارية'/> القضايا العقارية </h4>
                                    <p  className="text-gray-600 text-sm">نقدم خدمات متكاملة في القضايا العقارية تشمل النزاعات حول الملكية، الكراء، نزع الملكية، التحفيظ، والتصرفات العقارية، مع متابعة دقيقة للإجراءات القانونية أمام الجهات المختصة.</p>
                                </div>

                                <div className="col home-square btn col-md-3 col-6 col-sm-4 flex flex-col items-center text-center gap-2 p-2 my-2" >                                  
                                    <h4 className=''> <Icons.FaDollarSign size={30} className="mb-2 icon-blue"  title='القضايا التجارية'/> القضايا التجارية </h4>
                                    <p className="text-gray-600 text-sm">نتكفل بمختلف المنازعات التجارية بين الشركات أو الأفراد، بما في ذلك العقود التجارية، الأوراق المالية... مع التركيز على الحلول السريعة والفعالة.</p>
                                </div> 

                                <div className="col home-square btn col-md-3 col-6 col-sm-4 flex flex-col items-center text-center gap-2 p-2 my-2" >                                  
                                  <h4 className='w-100'> <Icons.FaEllipsisH className='icon home-service-icon mb-2 icon-blue '  />  قضايا أخرى </h4>
                                </div>                          
                             
          </div>
      </div>

      <div className='my-5 why-us subTitleCont'>
          <h3 className='subTitle icon-blue'> <Icons.FaStar  className='mb-2'/> لماذا نحن؟</h3>
          <div className='row d-flex  justify-content-center align-items-center mx-1' >
                                <div className="col home-square btn col-md-3 col-6 col-sm-6 flex flex-col  items-center text-center gap-2 p-3 my-2" >                                  
                                  <h4> <Icons.FaBriefcase size={30} className="mb-2 icon-blue" />  الخبرة القانونية العميقة</h4>
                                  <p  className="text-gray-600 text-sm text-align-justify">سنوات من الممارسة العملية في مختلف مجالات القانون، مع القدرة على التعامل مع القضايا المعقدة بكفاءة عالية.</p>
                                </div>
                                <div className="col home-square btn col-md-3 col-6 col-sm-6 flex flex-col items-center text-center gap-2 p-3 my-2" > 
                                  <h4> <Icons.FaUserTie size={30} className="mb-2 icon-blue"  /> الاحترافية والمصداقية</h4>
                                  <p  className="text-gray-600 text-sm text-align-justify"> تقديم الخدمات القانونية بأعلى معايير المهنية، مع الالتزام التام بأخلاقيات المهنة وشفافية التعامل مع العملاء.</p>
                                </div>
                                <div className="col home-square btn col-md-3 col-6 col-sm-6 flex flex-col items-center text-center gap-2 p-2 my-2" > 
                                  <h4> <Icons.FaUserShield size={30} className="mb-2 icon-blue"  /> حماية الحقوق والمصالح</h4>
                                  <p  className="text-gray-600 text-sm text-align-justify">نسعى لضمان حقوق الموكلين ومصالحهم القانونية، مع تقديم حلول قانونية تحميهم من النزاعات المستقبلية.</p>
                                </div>
                                <div className="col home-square btn col-md-3 col-6 col-sm-6 flex flex-col items-center text-center gap-2 p-3 my-2" >
                                  <h4> <Icons.FaRegLightbulb size={30} className="mb-2 icon-blue" />حلول قانونية مخصصة</h4>
                                  <p  className="text-gray-600 text-sm text-align-justify">تحليل كل حالة بعناية لتقديم استشارات وخطط قانونية تتناسب مع احتياجات الموكل وأهدافه.</p>
                                </div>
                                <div className="col home-square btn col-md-3 col-6 col-sm-6 flex flex-col items-center text-center gap-2 p-3 my-2" > 
                                  <h4> <Icons.FaComments size={30} className="mb-2 icon-blue mx-1"  />التواصل والدعم المستمر</h4>
                                  <p  className="text-gray-600 text-sm text-align-justify">توفير تواصل مباشر ومرن مع العملاء، مع متابعة مستمرة للقضايا لضمان نتائج ملموسة ورضا كامل.</p>
                                </div>
                             
          </div>
      </div>
      
      <div className='my-5 subTitleCont'>
          <h3 className='subTitle icon-blue '> <Icons.FaStar  className='mb-2 icon-blue'/> مبادؤنا </h3>
          <div className='row d-flex  justify-content-center align-items-start mx-1' >
                                <div className="col home-square btn col-md-3 col-6 col-sm-4 flex flex-col items-center text-center gap-2 p-2 my-2" >                                  
                                  <h4>  <Icons.FaBalanceScale size={30} className="mb-2 icon-blue "  title='النزاهة والشفافية' /> النزاهة والشفافية</h4>
                                  <p  className="text-gray-600 text-sm ">نحرص على الوضوح في كل خطوة، ونلتزم بتقديم الحقائق القانونية كما هي دون تضليل أو مبالغة.</p>
                                </div>
                                <div className="col home-square btn col-md-3 col-6 col-sm-4 flex flex-col items-center text-center gap-2 p-2 my-2" >                                  
                                    <h4><Icons.FaUserShield size={30} className="mb-2 icon-blue"  title='السرية والثقة'/> السرية والثقة </h4>
                                    <p  className="text-gray-600 text-sm">نحافظ على سرية المعلومات والوثائق الخاصة بموكلينا، ونعتبر الثقة ركيزة العلاقة المهنية.</p>
                                </div>
                                <div className="col home-square btn col-md-3 col-6 col-sm-4 flex flex-col items-center text-center gap-2 p-2 my-2" >                                  
                                    <h4><Icons.FaGavel size={30} className="mb-2 icon-blue"  title='العدالة والمسؤولية'/> العدالة والمسؤولية </h4>
                                    <p  className="text-gray-600 text-sm">نلتزم بالسعي الدائم لتحقيق العدالة والدفاع عن الحقوق وفق القوانين وأخلاقيات المهنة.</p>
                                </div>

                                <div className="col home-square btn col-md-3 col-6 col-sm-4 flex flex-col items-center text-center gap-2 p-2 my-2" >                                  
                                    <h4 className=''> <Icons.FaBriefcase size={30} className="mb-2 icon-blue"  title='الإتقان والمهنية'/> الإتقان والمهنية </h4>
                                    <p className="text-gray-600 text-sm">نولي كل قضية الاهتمام الكامل والدراسة الدقيقة لضمان أفضل النتائج القانونية الممكنة.</p>
                                </div>                          
                             
          </div>
      </div>

    </div>
      )}
    </> 
      


    
  )
}

export default Home