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
    <div className="container">
      <ins className="kakao_ad_area" style={{ display: 'none' }}
         data-ad-unit    = "DAN-kb6KBgxfsjneHEBu" 
         data-ad-width   = "250" 
         data-ad-height  = "250" />
    </div>
  );
}

Adfit.defaultProps = {
};

export default Adfit;