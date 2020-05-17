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

export const deleteBubble = () => { //Basic structure, class/styling not yet included
  if (messagesContainer.firstElementChild) {
    let latestMessage = messagesContainer.lastElementChild; 
    if (!(latestMessage.classList.contains('js-timestamp'))) {
      let extraBubblesContainer = document.querySelector('class^=js-extra-bubbles-container');
      let lastBubbleContainer = document.querySelector('class^=js-last-bubble-container');
      if (!extraBubblesContainer.firstChild) {
        deleteItem();
      } else if (extraBubblesContainer.children === 1) {
        lastBubbleContainer.lastElementChild.remove();
        extraBubblesContainer.firstElementChild.className = (latestMessage.classList.contains('js-message--other') && extraBubblesContainer.firstElementChild.tagName !== 'IMG')
          ? 'classname'
          : 'classname';
        lastBubbleContainer.prepend(extraBubblesContainer.firstElementChild);
      } else {
        lastBubbleContainer.lastElementChild.remove();
        lastBubbleContainer.prepend(extraBubblesContainer.lastElementChild);
      }
    }
  }
};

