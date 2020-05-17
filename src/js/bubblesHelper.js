import { displayPictures, messagesContainer } from './constants';

export const setTextEditable = (el) => {
  el.contentEditable = true;
  el.spellcheck = false;
  el.innerHTML = 'Edit this text';
};

export const toggleCreateDP = () => {
  let toggleButton = document.querySelector('.js-btn-toggle-dp');
  let dpControls = document.querySelector('.js-controls-dp');
  if (toggleButton.classList.contains('js-toggle')) {
    toggleButton.textContent = 'Hide "Seen" DP Controls';
    toggleButton.classList.toggle('js-toggle');
    dpControls.classList.toggle('js-dp-toggle');
  } else {
    toggleButton.textContent = 'Show "Seen" DP Controls';
    toggleButton.classList.toggle('js-toggle');
    dpControls.classList.toggle('js-dp-toggle');
  }

  Array.from(document.getElementsByClassName('js-dp-hide')).forEach((el) => el.classList.toggle('h-hide'));
};

export const removeRightDP = () => {
  Array.from(document.getElementsByClassName('js-right-dp-container')).forEach((el) => el.remove());
};

export const createRightDP = () => {
  removeRightDP();
  //Creating right DP and appending to container
  let numOfLeftDps = displayPictures.list.length;
  if (numOfLeftDps !== 0) {
    let rightDPContainer = document.createElement('div');
    rightDPContainer.className = 'l-container l-container--dp-right js-right-dp-container';
    for (let i = 0; i < numOfLeftDps; i++) {
      let dpSource = document.querySelector(`.${displayPictures.list[i]}`);
      let rightDP = dpSource.cloneNode(true);
      rightDP.className = 'c-dp--right';
      rightDPContainer.append(rightDP);
    }   
    messagesContainer.lastElementChild.append(rightDPContainer); 
  }
};

