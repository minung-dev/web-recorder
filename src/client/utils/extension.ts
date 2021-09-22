type sendMessageProps = { action: 'web-recorder-tools-active', data?: object }
const sendMessage = ({ action, data = {} }: sendMessageProps) => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action, data });
  });
}

export default {
  sendMessage,
}