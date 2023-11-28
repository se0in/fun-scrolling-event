/* 
  author @se0in
  Created Date : 2023.11.21.
  Update : 2023.11.28.
  * 스크롤에 따라 이미지들이 슬라이딩하는 스크롤 이벤트 
  TODO 코드 수정할 것
*/

import React, { useEffect, useMemo, useRef } from 'react';
import '../scss/SlideEmotion.scss';

const SlideEmoticon = () => {
  const [rainbowRef, rainbowWrapRef, containerRef] = [useRef(null), useRef(null), useRef(null)]
  const emotions = [...Array.from({ length: 7 }, (_, index) => index + 1)]

  const getRandom = useMemo(() => () => Math.random() * 3 + 0.5, []);

  useEffect(() => {
    const emotionsIcon = emotions.map((index) => document.querySelector(`.emotion_${index}`));

    const drawRainbow = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const rainbowWrap = rainbowWrapRef.current;
      const container = containerRef.current;
      const rainbow = rainbowRef.current;
      // * rainbow 계산
      const percentageScrolled = Math.floor(scrollTop / 15);
      // console.log('percentageScrolled: ', percentageScrolled);
      const maxPercentageScrolled = Math.min(percentageScrolled, 100);
      if (rainbow) {
        // rainbow.style.width = `${maxPercentageScrolled}%`;
      }
      const containerBounding = container ? container.getBoundingClientRect() : null;
      if (containerBounding && containerBounding.top <= 265) {
        rainbowWrap.style.position = 'fixed';
        rainbowWrap.style.top = '265px';
        rainbowWrap.style.left = '0';
        rainbowWrap.style.opacity = '1';
        rainbowWrap.style.transition = 'opacity .3s';
        emotionsIcon.forEach((emotion, i) => {
          if (emotion) {
            if (maxPercentageScrolled >= 90) {
              if (emotionsIcon[0] || emotionsIcon[1]) {
                const xPos = (percentageScrolled- 100) * 2.5 + '%';
                // console.log('percentageScrolled- 100: ', percentageScrolled- 100);
                const yPos = (percentageScrolled - 100) * 0.5 + '%';

                emotionsIcon[0].style.left = xPos;
                emotionsIcon[0].style.top = yPos;
                emotionsIcon[1].style.left = xPos;
                emotionsIcon[1].style.top = yPos;
              }
              emotion.style.display = 'block';
              const xPos = (percentageScrolled - 100) * 2.5 + '%';
              const yPos = (percentageScrolled - 100) * (i / 7) + '%';
              emotion.style.width = `${percentageScrolled}px`;
              emotion.style.left = xPos;
              emotion.style.top = yPos;

              const randomSpeed = getRandom();
              emotion.style.transition = `left ${randomSpeed}s, top ${randomSpeed}s`;

            } else {
              emotion.style.display = 'none';
            }
          }
        });
      } else {
        rainbowWrap.style.top = "-100%";
        rainbowWrap.style.position = 'static';
        // rainbowWrap.style.opacity = '0.5';
      }
      const slidingEndPosition = 3900;
      if (scrollTop >= 3800) {
        rainbowWrap.style.opacity = '0';
        if (scrollTop >= slidingEndPosition + 1000) {
          rainbowWrap.style.position = 'static';
        }
      }
    }

    window.addEventListener('scroll', drawRainbow);

    return () => {
      window.removeEventListener('scroll', drawRainbow);
    };
  });

  return (
    <div className='slide-emotion-content'>
      <div className="scroll-container" ref={containerRef}>
        <div className='rainbow-wrap' ref={rainbowWrapRef}>
          <img
            className='rainbow'
            ref={rainbowRef}
            src={process.env.PUBLIC_URL + './images/rainbow-sliding.png'}
            alt="rainbow"
          />
          <div className='emotion-list'>
            {emotions.map((index) => (
              <img
                key={`emotion_${index}`}
                className={`emotion_${index}`}
                src={process.env.PUBLIC_URL + `./images/emotion-${index}.png`}
                alt={`emotion ${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideEmoticon;
