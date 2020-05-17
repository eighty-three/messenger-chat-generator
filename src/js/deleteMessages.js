import { messagesContainer, dpListContainer } from './constants';

export const deleteAllMessages = () => {
  while (messagesContainer.firstElementChild) deleteMessage();
};

export const deleteMessage = () => {
  if (messagesContainer.firstElementChild) {
    let latestMessage = messagesContainer.lastElementChild; 
    if (!(latestMessage.classList.contains('js-timestamp'))) {
      let dpContainer = latestMessage.querySelector('.js-right-dp-container');
      if (dpContainer) {
        let len = dpContainer.children.length;
        for (let i=0; i < len; i++) {
          let arr = Array.from(dpContainer.children);
          let el = arr.pop();
          el.className = 'c-dp--list js-dp-from-list';
          dpListContainer.append(el);
        }
        dpContainer.remove();
      }
    }
    latestMessage.remove();
  }
};

