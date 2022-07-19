import { useState, useEffect } from 'react';

import utilExtension from '../utils/extension';

function useCheckExtension() {
  const [canUseExtension, setCanUseExtension] = useState<boolean>(false);

  useEffect(() => {
    utilExtension.sendMessage({ action: 'web-recorder-check', callback: (data) => {
      setCanUseExtension(data);
    }});
  }, []);

  return [canUseExtension];
}

export default useCheckExtension;