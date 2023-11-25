/* 
  author @se0in
  Created Date : 2023.11.22.
  * 텍스트가 자동으로 흐르며 스크롤에 따라 속도가 빨라지는 이벤트
  * 참고 출처 : https://codepen.io/rudtjd2548/pen/wvpgqwY
*/

import React, { useRef, useEffect, useState } from 'react';
import '../scss/FlowText.scss';

const FlowText = () => {
  const [textArr1] = useState("Have fun riding the slide!!".split(' '));
  const [textArr2] = useState("It's so fun. Let’s ride together too".split(' '));
  const [textArr3] = useState("I want to ride one more time".split(' '));
  
  const pTag1Ref = useRef(null);
  const pTag2Ref = useRef(null);
  const pTag3Ref = useRef(null);

  useEffect(() => {
    const pTag1 = pTag1Ref.current;
    const pTag2 = pTag2Ref.current;
    const pTag3 = pTag3Ref.current;

    let count1 = 0;
    let count2 = 0;
    let count3 = 0;

    const animate = () => {
      count1++;
      count2++;
      count3++;

      count1 = marqueeText(count1, pTag1, -1);
      count2 = marqueeText(count2, pTag2, 1);
      count3 = marqueeText(count3, pTag3, -1);

      window.requestAnimationFrame(animate);
    };

    const marqueeText = (count, element, direction) => {

      if (count > element.scrollWidth / 2) {
        element.style.transform = `translate3d(0, 0, 0)`;
        count = 0;
      }
      element.style.transform = `translate3d(${direction * count}px, 0, 0)`;

      return count;
    };

    const scrollHandler = () => {
      count1 += 15;
      count2 += 15;
      count3 += 15;
    };

    window.addEventListener('scroll', scrollHandler);
    animate();

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    
    const initTexts = (element, textArray) => {
      textArray.push(...textArray);
      let textContent = '';
      for (let i = 0; i < textArray.length; i++) {
        textContent += `${textArray[i]}\u00A0`;
      }
      element.innerText = textContent;
    };

    if (pTag1Ref.current && pTag2Ref.current && pTag3Ref.current) {
      initTexts(pTag1Ref.current, textArr1);
      initTexts(pTag2Ref.current, textArr2);
      initTexts(pTag3Ref.current, textArr3);
    }
  }, [textArr1, textArr2, textArr3]);

  return (
    <div className='flow-text-content'>
      <div className="text-line">
        <p ref={pTag1Ref}></p>
      </div>
      <div className="text-line">
        <p ref={pTag2Ref}></p>
      </div>
      <div className="text-line">
        <p ref={pTag3Ref}></p>
      </div>
    </div>
  );
};

export default FlowText;
