const extensionId: string = process.env.EXTENSION_ID || '';

type sendMessageProps = { action: 'web-recorder-tools-active', data?: object }
const sendMessage = ({ action, data = {} }: sendMessageProps) => {
  chrome.runtime.sendMessage(extensionId, { action, data });
}

export default {
  sendMessage,
}