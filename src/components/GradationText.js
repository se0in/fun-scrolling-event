/* 
  author @se0in
  Created Date : 2023.11.24.
  * 스크롤에 따라 회전하며 화면을 꽉 채우는 이벤트 
*/
import React, { useEffect, useRef } from "react";
import "../scss/GradationText.scss";

const GradationText = () => {
  const colorListRef = useRef([]);

  useEffect(() => {
    // * 스크롤 효과
    const rotateHandleScroll = () => {
      const isMobile = window.innerWidth < 1024;
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
      let isRotationComplete = degrees >= 90;

      phone.style.transform = isInsideViewPort
        ? `rotate(-${degrees}deg)`
        : "rotate(0deg)";
      phone.style.width = isInsideViewPort
        ? `${widthDefault + phoneWidth * 5}vw`
        : `${widthDefault}vw`;
      phone.style.height = isInsideViewPort
        ? `${heightDefault + phoneWidth * 20}vh`
        : `${heightDefault}vh`;

      // * 모바일 사이즈 일 경우
      if (isMobile) {
        phone.style.width = `${widthDefault + phoneWidth * 1}vw`;
        phone.style.height = `${heightDefault - 8}vh`;
      }

      if (isInsideViewPort && isRotationDiagonal) {
        phone.style.width = `${widthDefault + phoneWidth * 12}vw`;
        phone.style.height = `${heightDefault + phoneWidth * 30}vh`;

        // * 모바일 사이즈 일 경우
        if (isMobile) {
          phone.style.height = `${heightDefault + phoneWidth * 2}vh`;
        }

        // * 공통된 스타일 삼항
        phone.style.border = isRotationMostly ? "none" : "3px solid #ffffff5b";
        phone.style.borderRadius = isRotationMostly ? "0" : "54px";

        if (isRotationMostly) {
          // * 80도로 회전 완료 후 화면 채울 스타일
          phone.style.width = "100vh";
          phone.style.height = "100vw";
          phone.style.overflow = isRotationComplete ? "visible" : "hidden";

          // * 90도로 회전 완료 후 텍스트 영역 표시, 스크롤
          const BackgroundColorUlLeft =
          gradationBackgroundColorUl.getBoundingClientRect().left;
          const scrollXWidth = window.innerWidth + BackgroundColorUlLeft * -1;
          phone.style.overflowX = "scroll";
          
          let phoneScrollSection = isRotationComplete && scrollXWidth <= 3800;
          gradationBackgroundTextUl.style.display = phoneScrollSection ? "block" : "none";
          phone.style.pointerEvents = phoneScrollSection ? "auto" : "none";

        } else {
          // * text 숨김
          gradationBackgroundTextUl.style.display = "none";
        }
      } else {
        // * 초기 스타일
        phone.style.border = "3px solid #ffffff5b";
        phone.style.borderRadius = "54px";
        phone.style.overflow = "hidden";
        gradationBackgroundTextUl.style.display = "none";
      }
    };

    window.addEventListener("scroll", rotateHandleScroll);
    return () => {
      window.removeEventListener("scroll", rotateHandleScroll);
    };
  });

  return (
    <div className="gradation-text-content">
      <div className="gradation-inner">
        <div className="phone-box">
          <div className="phone">
            <ul className="gradation-background-color">
              {/* 요소 반복 */}
              {[...Array(6)].map((_, index) => (
                <li
                  className="colorList"
                  key={index}
                  ref={(element) => (colorListRef.current[index] = element)}
                ></li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="gradation-background-text">
          {/* 요소 반복 */}
          {[...Array(6)].map((_, index) => (
            <li key={index}>
              <p>Gradient effect!!</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GradationText;
