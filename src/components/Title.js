import React, { useEffect } from 'react';
import gsap, { Power4 } from 'gsap';
import '../scss/Title.scss';

const Title = () => {
  useEffect(() => {
    const containerCoords = document.querySelector('.title-container');
    const faceButton = document.querySelector('.face-button');
    const faceContainer = document.querySelector('.face-container');
    const bubbleContainer = document.querySelector('.bubble-box');
    const mouseCoords = containerCoords.getBoundingClientRect();

    const handleMouseMove = (e) => {
      const mouseX = e.pageX - containerCoords.offsetLeft;
      const mouseY = e.pageY - containerCoords.offsetTop;

      gsap.to(faceContainer, 0.3, {
        x: (mouseX - mouseCoords.width / 2) / mouseCoords.width * 100,
        y: (mouseY - mouseCoords.height / 2) / mouseCoords.width * 100,
        ease: Power4.easeOut,
      });
      gsap.to(bubbleContainer, 0.3, {
        x: (mouseX - mouseCoords.width / 2) / mouseCoords.width * 100,
        y: (mouseY - mouseCoords.height / 2) / mouseCoords.width * 100,
        ease: Power4.easeOut,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(faceContainer, 0.3, {
        x: 0,
        y: 0,
        scale: 1,
      });
      gsap.to(bubbleContainer, 0.3, {
        x: 0,
        y: 0,
        scale: 1,
      });
    };

    if (faceButton && faceContainer && containerCoords) {
      containerCoords.addEventListener('mousemove', handleMouseMove);
      containerCoords.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      containerCoords.removeEventListener('mousemove', handleMouseMove);
      containerCoords.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className='title-container'>
      <div className="bubble-box">
        <p>Let's Scroll!!(수정예정)</p>
      </div>

      <button className='face-button'>
        <div className="face-container">
          <img
            src={process.env.PUBLIC_URL + './images/emotion-1.png'}
            alt="emotion1" />
        </div>
      </button>
    </div>
  );
};

export default Title;
