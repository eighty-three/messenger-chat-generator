import { displayPictures, messagesContainer } from './constants';
import { setTextEditable } from './bubbles/bubblesHelper';
import { unselectImage } from './uploadImages';

export const createMessageOther = () => {
  let dpSource = document.querySelector('input[name="presetSelect"]:checked ~ .js-preset-compressed > img');
  let dpCurrent = dpSource.classList[0];
  let dpPrevious = displayPictures.previous[displayPictures.previous.length-1];

  if (
    !(messagesContainer.firstElementChild)
    || !(messagesContainer.lastElementChild.classList.contains('js-message--other'))
    || dpPrevious !== dpCurrent //Left DP ID is used as identifier for sender
  ) {
    let newContainer = document.createElement('div');
    newContainer.className = 'c-message__container js-message__container js-message--other';
    newContainer.addEventListener('drop', function(e) {
      e.preventDefault();
    });

    let newMessage = document.createElement('div'); //For chat bubble structure
    let extraBubblesContainer = document.createElement('div');
    extraBubblesContainer.className = 'l-container l-container--extra-bubbles js-extra-bubbles-container';
    let lastBubbleContainer = document.createElement('div');
    lastBubbleContainer.className = 'l-container l-container--last-bubble js-last-bubble-container';

    let newBubble;
    let selectedImage = document.querySelector('input[name="imageSelect"]:checked ~ label > img');
    if (!selectedImage) {
      newBubble = document.createElement('div');
      newBubble.className = 'c-bubble';
      setTextEditable(newBubble);

      newBubble.addEventListener('drop', function(e) { // For dropping display pictures
        e.preventDefault();
      });
    } else {
      newBubble = selectedImage.cloneNode(true);
      newBubble.removeAttribute('id');
      newBubble.onload = function () {
        newBubble.className = 'c-bubble--img';
      };

      newBubble.addEventListener('drop', function(e) {
        e.preventDefault();
      });
    }
    
    //js-create--other unique
    messagesContainer.append(newContainer);
    newContainer.append(newMessage);
    newMessage.append(extraBubblesContainer, lastBubbleContainer);
    lastBubbleContainer.append(newBubble);

    let messageSender = document.createElement('div'); //For person's name
    messageSender.className = 'c-bubble__name';
    setTextEditable(messageSender);
    let nameField = document.querySelector('input[name="presetSelect"]:checked + label .js-name-field');
    messageSender.innerText = (nameField && nameField.value !== '') ? nameField.value : 'Edit this text';

    let dpContainer = dpSource.cloneNode(true);
    dpContainer.className = `c-dp--left ${dpCurrent}-list`;
    dpContainer.removeAttribute('id');

    newMessage.prepend(messageSender);
    lastBubbleContainer.prepend(dpContainer);

    displayPictures.previous.push(dpCurrent);
    displayPictures.inUse.push(`${dpCurrent}-list`);

    unselectImage();
    let toggleButton = document.querySelector('.js-btn-toggle-dp');
    if (!(toggleButton.classList.contains('js-toggle'))) { //To add event listeners to newly created messages with controls open
      toggleButton.click();
      toggleButton.click();
    }
  }
};

export const createMessageSelf = () => {
  if (
    !(messagesContainer.firstElementChild)
    || !(messagesContainer.lastElementChild.classList.contains('js-message--self'))
  ) {
    let newContainer = document.createElement('div');
    newContainer.className = 'c-message__container js-message__container js-message--self';
    newContainer.addEventListener('drop', function(e) {
      e.preventDefault();
    });
    let newMessageSelf = document.createElement('div');
    newMessageSelf.className = 'l-container l-container--self js-container-self';
    let extraBubblesContainerSelf = document.createElement('div');
    extraBubblesContainerSelf.className = 'l-container l-container--extra-bubbles-self js-extra-bubbles-container-self';
    let lastBubbleContainerSelf = document.createElement('div');
    lastBubbleContainerSelf.className = 'js-last-bubble-container-self';

    let newBubbleSelf;
    let selectedImage = document.querySelector('input[name="imageSelect"]:checked ~ label > img');
    if (!selectedImage) {
      newBubbleSelf = document.createElement('div');
      newBubbleSelf.className = 'c-bubble c-bubble--self';
      setTextEditable(newBubbleSelf);

      newBubbleSelf.addEventListener('drop', function(e) { //For dropping display pictures
        e.preventDefault();
      });
    } else {
      newBubbleSelf = selectedImage.cloneNode(true);
      newBubbleSelf.removeAttribute('id');
      newBubbleSelf.onload = function () {
        newBubbleSelf.className = 'c-bubble--img';
      };

      newBubbleSelf.addEventListener('drop', function(e) {
        e.preventDefault();
      });
    }

    messagesContainer.append(newContainer);
    newContainer.append(newMessageSelf);
    newMessageSelf.append(extraBubblesContainerSelf, lastBubbleContainerSelf);
    lastBubbleContainerSelf.append(newBubbleSelf);

    unselectImage();
    let toggleButton = document.querySelector('.js-btn-toggle-dp');
    if (!(toggleButton.classList.contains('js-toggle'))) {
      toggleButton.click();
      toggleButton.click();
    }
  }
};

