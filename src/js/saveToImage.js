import domtoimage from 'dom-to-image';
import { messagesContainer } from './constants';

export const saveToImage = () => {
  let btn = document.getElementById('btnSave');
  btn.innerText = 'Saving... (this takes a while)';

  domtoimage.toPng(messagesContainer)
    .then(function (dataUrl) {
      let link = document.createElement('a');
      link.download = 'my-image-name.png';
      link.href = dataUrl;
      link.click();
    })
    .then(function () {
      btn.innerText = 'Save';
    });

};

