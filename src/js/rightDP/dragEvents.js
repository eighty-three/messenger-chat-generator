export const dragOver = (e) => {
  e.preventDefault();
};

export const dragEnter = (e) => {
  if (
    (e.target.parentNode.parentNode.classList.contains('js-message__container') //Dropping image into `message--other` uses last bubble container as its target
    && e.target.classList.contains('js-last-bubble-container'))
  ) {
    let el = e.target.parentNode.parentNode;
    el.setAttribute('style', 'background-color: rgb(59, 89, 152)');
  }
};

export const dragLeave = (e) => {
  if (
    (e.target.parentNode.parentNode.classList.contains('js-message__container')
    && e.target.classList.contains('js-last-bubble-container'))
  ) {
    let el = e.target.parentNode.parentNode;
    el.setAttribute('style', 'background-color: ""');
  }
};

export const dragDrop = (e) => {
  if (
    (e.target.parentNode.parentNode.classList.contains('js-message__container')
    && e.target.classList.contains('js-last-bubble-container'))
  ) {
    let el = e.target.parentNode.parentNode;
    el.setAttribute('style', 'background-color: ""');

    let dp = document.getElementById(e.dataTransfer.getData('text'));
    if (dp && dp.classList.contains('js-dp-from-list')) {
      dp.className = 'c-dp--right';
      if (el.querySelector('.js-right-dp-container')) {
        el.lastElementChild.append(dp);
      } else {
        let rightDPContainer = document.createElement('div');
        rightDPContainer.className = 'c-dp__right-container js-right-dp-container';
        el.append(rightDPContainer);
        rightDPContainer.append(dp);
      }
    }
  }
};

