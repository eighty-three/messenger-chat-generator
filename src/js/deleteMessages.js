import { messagesContainer } from './constants';
import { deleteRightDP } from './rightDP/controls';

export const deleteConversation = () => {
  while (messagesContainer.firstElementChild) deleteItem();
};

export const deleteItem = () => {
  if (messagesContainer.firstElementChild) {
    let latestMessage = messagesContainer.lastElementChild; 
    if (!(latestMessage.classList.contains('js-timestamp'))) {
      let dpContainer = latestMessage.querySelector('.js-right-dp-container');
      deleteRightDP(dpContainer);
    }
    latestMessage.remove();
  }
};

