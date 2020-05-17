import { counters, displayPictures, messagesContainer } from './constants';

export const deleteAllMessages = () => {
  while (messagesContainer.firstElementChild) deleteMessage();
};

export const deleteMessage = () => {
  if (messagesContainer.firstElementChild) {
    let latestMessage = messagesContainer.lastElementChild; 
    if (!(latestMessage.classList.contains('js-timestamp'))) {
      //Setting correct previous left DP after deleting latest message
      let dpCurrent = displayPictures.previous[displayPictures.previous.length-1];
      if (latestMessage.classList.contains('js-message--other')) {
        if (displayPictures.list.includes(dpCurrent)) displayPictures.list.splice(displayPictures.list.indexOf(dpCurrent), 1);
        displayPictures.previous.pop();
        counters.otherMessages--;
      }
    }
    latestMessage.remove();
  } else {  
    displayPictures.list.length = 0;
  }
};

