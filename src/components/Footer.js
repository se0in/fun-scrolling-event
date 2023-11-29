/* 
  author @se0in
  Created Date : 2023.11.23.
  * 출처가 들어갈 부분
*/
import React from 'react';
import '../scss/Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className="copyright">
        Copyright 2023 SEOIN. All rights reserved
      </div>
      <div className='source'>
        <p>이미지 출처 표시 의무 
          <a
            href="https://www.freepik.com"
            target='_blank'
            rel="noopener noreferrer"
          >Designed by coolvector / Freepik</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer