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
      if (dpContainer) deleteRightDP(dpContainer);
    }
    latestMessage.remove();
  }
};

export const deleteBubble = () => { //Basic structure, class/styling not yet included
  if (messagesContainer.firstElementChild) {
    let latestMessage = messagesContainer.lastElementChild; 
    if (!(latestMessage.classList.contains('js-timestamp'))) {
      let extraBubblesContainer = latestMessage.querySelector('.js-extra-bubbles-container');
      let lastBubbleContainer = latestMessage.querySelector('.js-last-bubble-container');
      if (!extraBubblesContainer.firstChild) {
        deleteItem();
      } else if (extraBubblesContainer.children.length === 1) {
        lastBubbleContainer.lastElementChild.remove();
        lastBubbleContainer.append(extraBubblesContainer.firstElementChild);
      } else {
        lastBubbleContainer.lastElementChild.remove();
        lastBubbleContainer.append(extraBubblesContainer.lastElementChild);
      }
    }
  }
};

