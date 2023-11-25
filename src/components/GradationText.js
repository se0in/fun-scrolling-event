/* 
  author @se0in
  Created Date : 2023.11.24.
  * 스크롤에 따라 회전하며 화면을 꽉 채우는 이벤트 
*/

import React, { useEffect } from 'react';
import '../scss/GradationText.scss'

const GradationText = () => {


  useEffect(() => {
    const rotateHandleScroll = () => {
      const isMobile = window.innerWidth < 1024


      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const inner = document.querySelector(".gradation-inner");
      const innerHeight = inner.getBoundingClientRect().top;
      const phone = document.querySelector(".phone");
      const gradationBackgroundColorUl = document.querySelector(".gradation-background-color");
      const gradationBackgroundTextUl = document.querySelector(".gradation-background-text");

      // * 스크롤, 회전 위치에 따라 스타일 변화될 부분
      let degrees = Math.min(Math.floor(scrollTop / 20) - 270, 90);
      let phoneWidth = degrees * 0.02 + 1.1;
      let widthDefault = 18.23;
      let heightDefault = 57.53;

      let isInsideViewPort = innerHeight === 0;
      let isRotationDiagonal = degrees >= 45;
      let isRotationMostly = degrees >= 85;
      let isRotationComplete = degrees >= 90

      phone.style.transform = isInsideViewPort ? `rotate(-${degrees}deg)` : 'rotate(0deg)';
      phone.style.width = isInsideViewPort ? `${widthDefault + (phoneWidth * 5)}vw` : `${widthDefault}vw`;
      phone.style.height = isInsideViewPort ? `${heightDefault + (phoneWidth * 20)}vh` : `${heightDefault}vh`;

      // * 모바일 사이즈 일 경우
      if (isMobile) {
        phone.style.width = `${widthDefault + (phoneWidth * 1)}vw`;
        phone.style.height = `${heightDefault - 8}vh`;
      }

      if (isInsideViewPort) {
        gradationBackgroundColorUl.style.pointerEvents = 'none';

        if (isRotationDiagonal) {
          phone.style.width = `${widthDefault + (phoneWidth * 12)}vw`;
          phone.style.height = `${heightDefault + (phoneWidth * 30)}vh`;

          // * 모바일 사이즈 일 경우
          if (isMobile) {
            phone.style.height = `${heightDefault + (phoneWidth * 2)}vh`;
          }

          // * 공통된 스타일 삼항 
          phone.style.border = isRotationMostly ? 'none' : '10px solid #fff';
          phone.style.borderRadius = isRotationMostly ? '0' : '54px';
          phone.style.overflow = isRotationMostly ? 'visible' : 'hidden';

          if (isRotationMostly) {
            // * 90도로 회전 완료 후 화면 채울 스타일
            phone.style.width = '100vh';
            phone.style.height = '100vw';

            if (isRotationComplete && isInsideViewPort) {
              phone.style.overflowX = 'scroll';
              gradationBackgroundColorUl.style.pointerEvents = 'auto';
              gradationBackgroundTextUl.style.display = 'block';
            }

          } else {
            // * text 숨김
            gradationBackgroundTextUl.style.display = 'none';
          }
        }
      } else {
        // * 초기 스타일
        phone.style.border = '10px solid #fff';
        phone.style.borderRadius = '54px';
        phone.style.overflow = 'hidden';
        gradationBackgroundTextUl.style.display = 'none';
      }

    };
    window.addEventListener('scroll', rotateHandleScroll);
    return () => {
      window.removeEventListener('scroll', rotateHandleScroll);
    };
  });




  return (
    <div className='gradation-text-content'>
      <div className='gradation-inner'>
        <div className='phone-box'>
          <div className='phone'>
            <ul className='gradation-background-color'>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <ul className='gradation-background-text'>
          <li><p>Gradient effect!!</p></li>
          <li><p>Gradient effect!!</p></li>
          <li><p>Gradient effect!!</p></li>
          <li><p>Gradient effect!!</p></li>
          <li><p>Gradient effect!!</p></li>
          <li><p>Gradient effect!!</p></li>
        </ul>
      </div>
    </div>
  )
}

export default GradationText