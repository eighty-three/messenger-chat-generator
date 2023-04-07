import { messagesContainer } from './constants';
import { setTextEditable } from './bubbles/bubblesHelper';

export const createTimestamp = () => {
  let timestamp = document.createElement('div');
  timestamp.className = 'c-timestamp js-timestamp';
  setTextEditable(timestamp);
  messagesContainer.append(timestamp);
};

