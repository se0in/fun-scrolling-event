import React, { useEffect, useState } from 'react';
import '../scss/GradationText.scss'

const GradationText = () => {
  const [rotation, setRotation] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      console.log('scrollTop: ', scrollTop);
      setRotation(scrollTop);
      const content = document.querySelector(".gradation-text-content");
      const inner = document.querySelector(".gradation-inner");
      const contentHeight = content.getBoundingClientRect();
      const innerHeight = inner.getBoundingClientRect().top;
      const test = inner.getBoundingClientRect()
      
      const phone = document.querySelector(".phone");
      if(innerHeight <= 0) {
        const degrees = Math.min(Math.floor(scrollTop / 20) - 270, 90);
        console.log('degrees: ', degrees);
        // phone.style.transform = `rotate(-${degrees}deg)`
        // const phoneWidth = Math.floor((scrollTop / 500) * 0.1)
        const phoneWidth = degrees * 0.01 + 1.1
        phone.style.transform = `rotate(-${degrees}deg) scale(${phoneWidth})`
        phone.style.transition = '.1s'
        if(degrees >= 45){
          console.log('000');
          
          const phoneWidth = degrees * 0.01 + 1.4
          phone.style.transform = `rotate(-${degrees}deg) scale(${phoneWidth})`
          /* phone.style.width = '100vw'
          phone.style.height = '100vh' */
          if(degrees >= 90){
            
            // phone.style.transform = `rotate(-${degrees}deg) scale(4)`
            phone.style.width = '100vw';
            phone.style.height = '100vh';
          }else {
            phone.style.width = '350px';
            phone.style.height = '550px';
          }
        }
        console.log('phoneWidth: ', phoneWidth);
      }else {
        phone.style.transform = 'rotate(0deg)'
        
      }

    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  return (
    <div className='gradation-text-content'>
      <div className='gradation-inner'>
        <div className='phone-box'>
          <div className='phone'>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default GradationText