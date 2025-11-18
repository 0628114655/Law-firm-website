import React from 'react'
import { useState, useEffect } from 'react'
import * as icons from 'react-icons/fa'




function Blog() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [articlePerPage, setArticlePerPage] = useState(5)


    function BlogContent({blog}){
      return(
        <>
        <h4 className='text-center'>{blog.title}</h4>
        <p>{blog.introduction} </p>
        <p>{blog.content}</p>
        <p>{blog.conclusion}</p>
        <br />    
        </>
        
      )
    }

useEffect(()=>{
    const getBlog =  async () => {
      try{
      let response = await fetch('/Blog/')
      let data = await response.json()
      console.log('data is',data)
      setContent(data)
      }
      catch(e){
          setError(e.message)
      }
      finally{
      setLoading(false)
      }
  }
  getBlog()
}, [])


const lastArticleIndex = currentPage * articlePerPage
const firstArticleIndex = lastArticleIndex - articlePerPage
const currentArticles = content.length > 0 
  ? content.slice(firstArticleIndex, lastArticleIndex)
  : [];
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
}, [currentArticles]);

  



 
return (
    <div  className='container'>
        {error ? <p className='text-danger d-flex justify-content-center align-items-center'> حدث خطأ أثناء تحميل المشاريع: {error}</p>:
         loading ? ( <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">جارٍ التحميل...</span>
                        </div>
                    </div>)
        :          
        <div className="row raya-container"> 
            <h3 className='text-center element' style={{transform : 'none'}}> المدونة </h3>
            {currentArticles.map(c=>
              <div key={c.id} className='p-1 my-4 element'>
                < BlogContent  blog = {c}  />
              </div>
            )}

            <div className='d-flex justify-content-center align-items-center mt-3 element' style={{transform: 'none'}}>
              <button className="btn btn-outline-secondary btn-sm mx-1" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}> الصفحة السابقة </button> 
              <button className="btn btn-primary btn-sm mx-1">{currentPage}</button>
              <button className="btn btn-outline-secondary btn-sm mx-1" disabled={currentPage >= Math.ceil(content.length / articlePerPage)}  onClick={() => setCurrentPage(currentPage + 1)} >الصفحة التالية</button>     
            </div>
        </div>    
        
      }
    </div>

  )
    }
  

export default Blog