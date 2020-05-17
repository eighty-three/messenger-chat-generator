import { messagesContainer } from './constants';
import { setTextEditable } from './bubblesHelper';
import { unselectImage } from './uploadImages';

export const addBubble = () => {
  if (
    messagesContainer.lastElementChild
    && !messagesContainer.lastElementChild.classList.contains('js-timestamp')
  ) {
    (messagesContainer.lastElementChild.classList.contains('js-message--other'))
      ? addBubbleOther()
      : addBubbleSelf();
    unselectImage();
  }
};

const addBubbleOther = () => {
  let latestMessage = messagesContainer.lastElementChild.firstElementChild;
  let extraBubblesContainer = latestMessage.querySelector('.js-extra-bubbles-container');
  let lastBubbleContainer = latestMessage.querySelector('.js-last-bubble-container'); 
  let lastBubble = lastBubbleContainer.lastElementChild; 

  lastBubble.className = (extraBubblesContainer.firstElementChild)
    ? 'c-bubble__edge--mid'
    : 'c-bubble__edge--first';
  lastBubble.className = (lastBubble.tagName !== 'IMG')
    ? `${lastBubble.classList} c-bubble--extra c-bubble`
    : 'c-bubble--extra c-bubble--img';

  let newBubble;
  let selectedImage = document.querySelector('input[name="imageSelect"]:checked ~ label > img');
  if (!selectedImage) {
    newBubble = document.createElement('div');
    newBubble.className = 'c-bubble c-bubble__edge--last';
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
};

const addBubbleSelf = () => {
  let latestMessage = messagesContainer.lastElementChild.firstElementChild;
  let extraBubblesContainerSelf = latestMessage.querySelector('.js-extra-bubbles-container-self');
  let lastBubbleContainerSelf = latestMessage.querySelector('.js-last-bubble-container-self');
  let lastBubbleSelf = lastBubbleContainerSelf.firstElementChild;

  lastBubbleSelf.className = (extraBubblesContainerSelf.firstElementChild)
    ? 'c-bubble__edge--self-mid'
    : 'c-bubble__edge--self-first';
  lastBubbleSelf.className = (lastBubbleSelf.tagName !== 'IMG')
    ? `${lastBubbleSelf.classList} c-bubble c-bubble--self`
    : 'c-bubble--img';

  let newBubbleSelf;
  let selectedImage = document.querySelector('input[name="imageSelect"]:checked ~ label > img');
  if (!selectedImage) {
    newBubbleSelf = document.createElement('div');
    newBubbleSelf.className = 'c-bubble c-bubble--self c-bubble__edge--self-last';
    setTextEditable(newBubbleSelf);
  } else {
    newBubbleSelf = selectedImage.cloneNode(true);
    newBubbleSelf.removeAttribute('id');
    newBubbleSelf.onload = function() {
      newBubbleSelf.className = 'c-bubble--img';
    };
  } 

  extraBubblesContainerSelf.append(lastBubbleSelf);
  lastBubbleContainerSelf.append(newBubbleSelf);
};

