// sidebar -> background -> content-script 형식으로 데이터 내려주는 용도
chrome.runtime.onMessageExternal.addListener(message => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
});

