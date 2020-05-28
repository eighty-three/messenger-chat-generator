import { messagesContainer, displayPictures } from './constants';
import { deleteRightDP } from './rightDP/controls';

export const deleteConversation = () => {
  while (messagesContainer.firstElementChild) deleteItem();
};

export const deleteItem = () => {
  if (messagesContainer.firstElementChild) {
    let latestItem = messagesContainer.lastElementChild; 
    if (!(latestItem.classList.contains('js-timestamp'))) {
      let dpContainer = latestItem.querySelector('.js-right-dp-container');
      if (dpContainer) deleteRightDP(dpContainer);
      if (latestItem.classList.contains('js-message--other')) displayPictures.inUse.pop();
    }
    latestItem.remove();
  }
};

export const deleteBubble = () => {
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

