import { injectApp } from './content';


let injected = false;


chrome.runtime.onMessage.addListener(message => {
  switch (message.action) {
    case 'web-recorder-tools-active':
      if (!injected) {
        injectApp();
        injected = true;
      }
    break;
  }
});