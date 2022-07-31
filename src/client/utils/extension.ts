const extensionId: string = process.env.EXTENSION_ID || '';

type sendMessageProps = { action: 'web-recorder-tools-active' | 'web-recorder-check', data?: object, callback?: ((response: any) => void) }
const sendMessage = ({ action, data = {}, callback }: sendMessageProps) => { 
  if (!extensionId) {
    return;
  }

  chrome?.runtime?.sendMessage?.(extensionId, { action, data }, callback);
}

export default {
  sendMessage,
}