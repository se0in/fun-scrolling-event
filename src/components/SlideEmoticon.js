import React, { useEffect, useMemo, useRef } from 'react';
import '../scss/SlideEmotion.scss';

const SlideEmoticon = () => {
  const rainbowRef = useRef(null);
  const rainbowWrapRef = useRef(null);
  const containerRef = useRef(null);
  const icons = useMemo(() => [1, 2, 3, 4, 5, 6, 7], []);

  const getRandom = useMemo(() => () => Math.random() * 3 + 0.5, []);
  const plusSection = 1500;

  useEffect(() => {
    const items = icons.map((index) => document.querySelector(`.icon_${index}`));

    const drawRainbow = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight + plusSection;
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
        rainbowWrap.style.top = '10%';
        rainbowWrap.style.left = '0';
        items.forEach((item, i) => {
          if (item) {
            if (maxPercentageScrolled === 100) {
              if (items[0] || items[1]) {
                console.log('item: ', items[0]);
                const xPos = (percentageScrolled - 100) + '%';
                const yPos = (percentageScrolled - 100) * 0.5 + '%';

                items[0].style.left = xPos;
                items[0].style.top = yPos;
                items[1].style.left = xPos;
                items[1].style.top = yPos;
              }
              item.style.display = 'block';
              const xPos = (percentageScrolled - 100 - i) + '%';
              const yPos = (percentageScrolled - 100 - i) * (i / 7) + '%';
              item.style.width = `${percentageScrolled}px`;
              item.style.left = xPos;
              item.style.top = yPos;

              const randomSpeed = getRandom();
              item.style.transition = `left ${randomSpeed}s, top ${randomSpeed}s`;
            } else {
              item.style.display = 'none';
            }
          }
        });
      } else {
        rainbowWrap.style.position = 'static';
      }
    };

    window.addEventListener('scroll', drawRainbow);

    return () => {
      window.removeEventListener('scroll', drawRainbow);
    };
  }, [getRandom, icons]);

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
          <div className='icon-list'>
            {icons.map((index) => (
              <img
                key={`icon_${index}`}
                className={`icon_${index}`}
                src={process.env.PUBLIC_URL + `./images/emotion-${index}.png`}
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
