import { messagesContainer } from '../constants';
import { setTextEditable } from './bubblesHelper';
import { unselectImage } from '../uploadImages';

export const addBubble = () => {
  if (
    messagesContainer.lastElementChild
    && !messagesContainer.lastElementChild.classList.contains('js-timestamp')
  ) {
    let latestMessage = messagesContainer.lastElementChild.firstElementChild;
    let extraBubblesContainer = latestMessage.querySelector('.js-extra-bubbles-container');
    let lastBubbleContainer = latestMessage.querySelector('.js-last-bubble-container'); 
    let lastBubble = lastBubbleContainer.lastElementChild; 
    
    let newBubble;
    let selectedImage = document.querySelector('input[name="imageSelect"]:checked ~ label > img');
    if (!selectedImage) {
      newBubble = document.createElement('div');
      newBubble.className = 'c-bubble';
      setTextEditable(newBubble);
    } else {
      newBubble = selectedImage.cloneNode(true);
      newBubble.removeAttribute('id');
      newBubble.onload = function() {
        newBubble.className = 'c-bubble--img';
      };
    }
    
    extraBubblesContainer.append(lastBubble);
    lastBubbleContainer.append(newBubble);
    unselectImage();
  }
};

