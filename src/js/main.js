import { imageUpload, presetImageUpload } from './constants';
import { createMessageOther, createMessageSelf } from './createMessage';
import { addBubble } from './bubbles/addBubble';
import { createTimestamp } from './timestamp';
import { deleteMessage, deleteAllMessages } from './deleteMessages';
import { toggleCreateDP, createRightDP, removeRightDP, refreshList } from './rightDP/controls';
import { addPreset, deletePreset, togglePreset } from './presets';
import { saveToImage } from './saveToImage';
import { addImages, unselectImage, deleteImage } from './uploadImages';

(function() {
  //Create
  document.querySelector('.js-btn-timestamp').addEventListener('click', createTimestamp);
  document.querySelector('.js-btn-create-other').addEventListener('click', createMessageOther);
  document.querySelector('.js-btn-create-self').addEventListener('click', createMessageSelf);
  document.querySelector('.js-btn-add').addEventListener('click', addBubble);

  //Delete
  document.querySelector('.js-btn-delete-all').addEventListener('click', deleteAllMessages);
  document.querySelector('.js-btn-delete-message').addEventListener('click', deleteMessage);

  //"Seen" DP
  document.querySelector('.js-btn-toggle-dp').addEventListener('click', toggleCreateDP);
  document.querySelector('.js-btn-remove-dp').addEventListener('click', removeRightDP);
  document.querySelector('.js-btn-append-dp').addEventListener('click', createRightDP);
  document.querySelector('.js-btn-refresh-dp').addEventListener('click', refreshList);
  let dpListDefault = document.getElementById('js-list-dp-default');
  dpListDefault.addEventListener('dragstart', function(e) {
    e.target.style.opacity = .5;
    e.dataTransfer.setData('text', e.target.id);
  });
  dpListDefault.addEventListener('dragend', function(e) {
    e.target.style.opacity = 1;
  });


  //Presets
  document.querySelector('.js-btn-add-preset').addEventListener('click', () => presetImageUpload.click());
  presetImageUpload.addEventListener('change', addPreset);
  document.querySelector('.js-btn-delete-preset').addEventListener('click', deletePreset);
  document.querySelector('.js-preset-compressed').addEventListener('click', togglePreset);
  document.querySelector('.js-presets__label').addEventListener('click', togglePreset);
  
  //Save
  document.querySelector('.js-btn-save').addEventListener('click', saveToImage);

  //Images
  document.querySelector('.js-btn-image').addEventListener('click', () => imageUpload.click());
  imageUpload.addEventListener('change', addImages);
  document.querySelector('.js-btn-unselect').addEventListener('click', unselectImage);
  document.querySelector('.js-btn-delete-image').addEventListener('click', deleteImage);

} ());

