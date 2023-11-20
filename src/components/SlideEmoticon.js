import React, { useEffect, useRef } from 'react';
import '../scss/SlideEmotion.scss'

const SlideEmoticon = () => {
  const rainbowRef = useRef(null);
  const rainbowRefParent = useRef(null);

  useEffect(() => {
    const drawLine = () => {
      const scrollTop = window.scrollY;
      console.log('scrollTop: ', scrollTop);
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const percentageScrolled = (scrollTop / (documentHeight - windowHeight)) * 100;

      const line = rainbowRef.current;
      line.style.width = `${percentageScrolled}%`;

      
      const lineBounding = line.getBoundingClientRect();

      if(lineBounding.top <= 0 && scrollTop > windowHeight ){
        line.style.position = 'fixed';
        line.style.top = '0';
        line.style.left = '0';
      }else {
        line.style.position = 'static'; // 화면 상단 이상으로 올라가면 다시 static으로 설정
      }
    };
    
    window.addEventListener('scroll', drawLine);
    
    return () => {
      window.removeEventListener('scroll', drawLine);
    };
  }, []);
  return (
    <div className='slide-emotion-content'>
      <div className="scroll-container" ref={rainbowRefParent}>
        <img 
        src={process.env.PUBLIC_URL+'./images/rainbow-sliding.png'} 
        alt="sliding-rainbow"  
        ref={rainbowRef}/>
      </div>
    </div>
  );
};

export default SlideEmoticon;

