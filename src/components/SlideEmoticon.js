import React, { useEffect, useMemo, useRef } from 'react';
import '../scss/SlideEmotion.scss';

const SlideEmoticon = () => {
  const [rainbowRef, rainbowWrapRef, containerRef] = [useRef(null), useRef(null), useRef(null)]
  const emotions = [...Array.from({ length: 7 }, (_, index) => index + 1)]
  const icons = [...Array.from({ length: 7 }, (_, index) => index + 1)]

  const getRandom = useMemo(() => () => Math.random() * 3 + 0.5, []);

  const plusSection = 4500;

  useEffect(() => {
    const emotionsIcon = emotions.map((index) => document.querySelector(`.emotion_${index}`));

    const drawRainbow = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const rainbowWrap = rainbowWrapRef.current;
      const container = containerRef.current;
      const percentageScrolled = (scrollTop / (documentHeight - windowHeight)) * 400;
      const maxPercentageScrolled = Math.min(percentageScrolled, 100);
      const rainbow = rainbowRef.current;
      if (rainbow) {
        rainbow.style.width = `${maxPercentageScrolled}%`;
      }
      const containerBounding = container ? container.getBoundingClientRect() : null;

      if (containerBounding && containerBounding.top <= 83.722) {
        rainbowWrap.style.position = 'fixed';
        rainbowWrap.style.top = '35vh';
        rainbowWrap.style.left = '0';
        rainbowWrap.style.opacity = '1';
        rainbowWrap.style.transition = 'opacity .5s';
        emotionsIcon.forEach((emotion, i) => {
          if (emotion) {
            if (maxPercentageScrolled === 100) {
              if (emotionsIcon[0] || emotionsIcon[1]) {
                const xPos = (percentageScrolled - 100) + '%';
                const yPos = (percentageScrolled - 100) * 0.5 + '%';

                emotionsIcon[0].style.left = xPos;
                emotionsIcon[0].style.top = yPos;
                emotionsIcon[1].style.left = xPos;
                emotionsIcon[1].style.top = yPos;
              }
              emotion.style.display = 'block';
              const xPos = (percentageScrolled - 100) + '%';
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
        rainbowWrap.style.position = 'static';
        rainbowWrap.style.opacity = '0';
      }
      const slidingEndPosition = documentHeight - windowHeight - plusSection;

      if (scrollTop >= slidingEndPosition) {
        rainbowWrap.style.opacity = '0';
        if(scrollTop - slidingEndPosition >= 500){
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
          <div className="icon-list">
            {icons.map((index) => (
              <img
                key={`icon_${index}`}
                className={`icon_${index}`}
                src={process.env.PUBLIC_URL + `./images/icon-${index}.png`}
                alt={`icon ${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideEmoticon;
