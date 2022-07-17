import { useState, useEffect } from 'react';

import utilExtension from '../utils/extension';

function useCheckExtension() {
  const [canUseExtension, setCanUseExtension] = useState<boolean>(false);

  useEffect(() => {
    utilExtension.sendMessage({ action: 'web-recorder-check', callback: (data) => {
      setCanUseExtension(data);
    }});
  }, []);

  // return [canUseExtension]; TODO: 익스텐션 심사 통과 이후 아래 코드와 변경하기
  return [true];
}

export default useCheckExtension;