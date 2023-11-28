/* 
  author @se0in
  Created Date : 2023.11.28.
  * 스크롤 위치에 따라 비가 내리며 해당 높이가 지나면 눈 영역으로 변경
  * coloso 광고 보고 구상
*/
import React, { useEffect, useRef } from 'react';
import '../scss/Weather.scss';

const Weather = () => {
  // * 날짜 가져오기
  const currentDate = new Date();
  const year = String(currentDate.getFullYear()).slice(-2); // * 뒤 두 자리만
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const week = currentDate.getDay();
  const weeks = ['日', '月', '火', '水', '木', '金', '土']; // * 요일 한자로 표시
  const dayOfWeek = weeks[week];

  const rainItems = useRef([]);
  
  useEffect(() => {
    // * 비 떨어지는 효과 
    const rainEffect = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const rainItems = Array.from(document.querySelectorAll('.rain-item'));
    const rainSpeeds = [2,4,6,2,4,6,2,4,6,2,4,6];

    rainItems.forEach((item, index) => {
      // * 비 떨어지는 스타일
      // * 아래로
      const rainDefaultTop = 0;
      let exceptHeight = 1700
      let rainScroll = Math.floor((scrollTop / 1110) * (scrollTop / 1500));
      let rainPosition = rainScroll * 20;
      let rainToBottom = rainDefaultTop + rainPosition - exceptHeight;
      let adjustedRainToBottom = rainToBottom * rainSpeeds[index];
      item.style.top = `${adjustedRainToBottom}px`;
    });
    }
    window.addEventListener("scroll", rainEffect);
    return () => {
      window.removeEventListener("scroll", rainEffect);
    }
  });

  return (
    <div className='weather-content'>
      <div className="weather-box">
        {/* 비 */}
        <div className='rain-box'>
          <p className='rain-title'>Rain</p>
          <ul className="rain-inner">
            {/* 비 영역 반복 */}
            {[...Array(4)].map((_, index) => (
              <li
                className="column"
                key={index}
              >
                <span 
                ref={(el)=> (rainItems.current[index] = el)}
                className='rain-item'></span>
                <span 
                ref={(el)=> (rainItems.current[index + 4] = el)}
                className='rain-item'></span>
                <span 
                ref={(el)=> (rainItems.current[index + 8] = el)}
                className='rain-item'></span>
              </li>
            ))}
          </ul>
        </div>
        <div className="date-box">
          <div className='circle'><p>{month}</p></div>
          <div className='circle'><p>{day}</p></div>
          <div className='circle'><p>{year}</p></div>
          <div className='circle'><p className='week'>{dayOfWeek}</p></div>
        </div>
      </div>
    </div>
  )
}

export default Weather