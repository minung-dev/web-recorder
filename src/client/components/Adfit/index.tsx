import React, { useEffect } from 'react';

type AdfitProps = {};

function Adfit(props: AdfitProps) {
  useEffect(() => {
    if (!document.getElementById('KakaoAdfit')) {
      const scriptKakaoJS = document.createElement('script');
      scriptKakaoJS.id = 'KakaoAdfit';
      scriptKakaoJS.src = 'https://t1.daumcdn.net/kas/static/ba.min.js';
      scriptKakaoJS.async = true;
      document.body.appendChild(scriptKakaoJS);
    }
  }, []);
  return (
    <div className="container is-flex is-flex-direction-column">
      <ins className="kakao_ad_area" style={{ display: 'none' }} 
        data-ad-unit    = "DAN-2x3MLfVyFH8Fl8Hw" 
        data-ad-width   = "320" 
        data-ad-height  = "50"></ins>
    </div>
  );
}

Adfit.defaultProps = {
};

export default Adfit;