import { displayPictures, counters, messagesContainer } from './constants';

export const setTextEditable = (el) => {
  el.contentEditable = true;
  el.spellcheck = false;
  el.innerHTML = 'Edit this text';
};

export const createRightDp = () => {
  //Hiding previous right DP container after new message
  let prevRightDPContainer = document.getElementById(`rightdpcontainer-${counters.totalMessages - 1}`);
  if (prevRightDPContainer) {
    prevRightDPContainer.style.display = 'none';
  }
  //Creating right DP and appending to container
  let numOfLeftDps = displayPictures.list.length;
  if (numOfLeftDps !== 0) {
    let rightDPContainer = document.createElement('div');
    rightDPContainer.id = `rightdpcontainer-${counters.totalMessages}`;
    rightDPContainer.className = 'l-container l-container--dp-right';
    for (let i = 0; i < numOfLeftDps; i++) {
      let dpSource = document.querySelector(`.${displayPictures.list[i]}`);
      let rightDP = dpSource.cloneNode(true);
      rightDP.className = 'c-dp--right';
      rightDPContainer.append(rightDP);
    }   
    messagesContainer.lastElementChild.append(rightDPContainer); 
  }
  counters.totalMessages++;
};

