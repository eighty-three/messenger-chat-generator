import { counters, displayPictures, messagesContainer } from './constants';

export const deleteAllMessages = () => {
  while (messagesContainer.firstElementChild) deleteMessage();
};

export const deleteMessage = () => {
  if (messagesContainer.firstElementChild) {
    let latestMessage = messagesContainer.lastElementChild; 
    if (!(latestMessage.classList.contains('js-timestamp'))) {
      //Getting previous right DP container to show after deleting latest message
      let previousTotalMessages = counters.totalMessages - 1;
      let prevRightDPContainer = document.getElementById(`rightdpcontainer-${previousTotalMessages - 1}`);
      if (prevRightDPContainer) {
        prevRightDPContainer.style.display = 'flex';
      }
      //Setting correct previous left DP after deleting latest message
      let dpCurrent = displayPictures.previous[displayPictures.previous.length-1];
      if (latestMessage.classList.contains('js-message--other')) {
        if (displayPictures.list.includes(dpCurrent)) displayPictures.list.splice(displayPictures.list.indexOf(dpCurrent), 1);
        displayPictures.previous.pop();
        counters.otherMessages--;
      }
      counters.totalMessages = (counters.totalMessages > 1) ? counters.totalMessages-1 : 1;
    }
    latestMessage.remove();
  } else {  
    displayPictures.list.length = 0;
  }
};

