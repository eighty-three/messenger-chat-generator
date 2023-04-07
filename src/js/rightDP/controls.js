import { dragOver, dragEnter, dragLeave, dragDrop } from './dragEvents';
import { messagesContainer, dpListContainer, displayPictures } from '../constants';

export const deleteRightDP = (dpContainer) => {
  let len = dpContainer.children.length;
  for (let i=0; i < len; i++) {
    let arr = Array.from(dpContainer.children);
    let el = arr.pop();
    el.className = 'c-dp--list js-dp-from-list';
    dpListContainer.append(el);
  }
  dpContainer.remove();
};

export const removeRightDP = () => {
  Array.from(document.getElementsByClassName('js-right-dp-container')).forEach((el) => deleteRightDP(el));
};

export const toggleCreateDP = () => {
  let toggleButton = document.getElementById('btnDPToggle');
  let dpControls = document.getElementById('dpControlsContainer');
  if (toggleButton.classList.contains('js-toggle')) {
    toggleButton.textContent = 'Hide "Seen" DP Controls';
    toggleButton.classList.toggle('js-toggle');
    dpControls.classList.toggle('js-dp-toggle');
    Array.from(document.querySelectorAll('.js-message__container')).forEach((el) => {
      el.addEventListener('dragover', dragOver);
      el.addEventListener('dragenter', dragEnter);
      el.addEventListener('dragleave', dragLeave);
      el.addEventListener('drop', dragDrop);
    });

  } else {
    toggleButton.textContent = 'Show "Seen" DP Controls';
    toggleButton.classList.toggle('js-toggle');
    dpControls.classList.toggle('js-dp-toggle');
    Array.from(document.getElementsByClassName('js-message__container')).forEach((el) => {
      el.removeEventListener('dragover', dragOver);
      el.removeEventListener('dragenter', dragEnter);
      el.removeEventListener('dragleave', dragLeave);
      el.removeEventListener('drop', dragDrop);
    });
  }
  Array.from(document.getElementsByClassName('js-dp-hide')).forEach((el) => el.classList.toggle('h-hide'));
};

export const createRightDP = () => {
  removeRightDP();
  //Creating right DP and appending to container
  let dpListImages = dpListContainer.children;
  let len = dpListImages.length;
  if (len !== 0) {
    let rightDPContainer = document.createElement('div');
    rightDPContainer.className = 'c-dp__right-container js-right-dp-container';
    for (let i = 0; i < len; i++) {
      let images = Array.from(dpListImages);
      let image = images.pop();
      image.className = 'c-dp--right';
      rightDPContainer.append(image);
    }   
    messagesContainer.lastElementChild.append(rightDPContainer); 
  }
};

export const refreshList = () => {
  removeRightDP();
  while (dpListContainer.children.length > 0) {
    dpListContainer.children[0].remove();
  }
  let filtered = new Set(displayPictures.inUse);
  let arr = Array.from(filtered.values());
  let len = arr.length;
  for (let i=0; i < len; i++) {
    let image = document.querySelector(`.${arr[i]}`);
    let dpListNewImage = image.cloneNode(true);
    dpListNewImage.className = 'c-dp--list js-dp-from-list';
    dpListNewImage.id = `js-list-${i}-dp`;
    
    dpListNewImage.addEventListener('dragstart', function(e) {
      e.target.style.opacity = .5;
      e.dataTransfer.setData('text', e.target.id);
    });
    
    dpListNewImage.addEventListener('dragend', function(e) {
      e.target.style.opacity = 1;
    });
    
    dpListContainer.append(dpListNewImage);      
  }
};

