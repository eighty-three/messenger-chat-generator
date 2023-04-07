import { imageUpload, presetImageUpload, dpListContainer } from './constants';
import { createMessageOther, createMessageSelf } from './createMessage';
import { addBubble } from './bubbles/addBubble';
import { createTimestamp } from './timestamp';
import { deleteBubble, deleteItem, deleteConversation } from './deleteMessages';
import { toggleCreateDP, createRightDP, removeRightDP, refreshList } from './rightDP/controls';
import { addPreset, deletePreset, togglePreset } from './presets';
import { saveToImage } from './saveToImage';
import { addImages, unselectImage, deleteImage } from './uploadImages';
import defaultIMG from '../assets/images/default.png';

(function() {
  //Create
  document.getElementById('btnCreateTimestamp').addEventListener('click', createTimestamp);
  document.getElementById('btnCreateMsgOther').addEventListener('click', createMessageOther);
  document.getElementById('btnCreateMsgSelf').addEventListener('click', createMessageSelf);
  document.getElementById('btnAddBubble').addEventListener('click', addBubble);

  //Delete
  document.getElementById('btnDeleteBubble').addEventListener('click', deleteBubble);
  document.getElementById('btnDeleteItem').addEventListener('click', deleteItem);
  document.getElementById('btnDeleteConversation').addEventListener('click', deleteConversation);

  //"Seen" DP
  document.getElementById('btnDPToggle').addEventListener('click', toggleCreateDP);
  document.getElementById('btnDPRemoveAll').addEventListener('click', removeRightDP);
  document.getElementById('btnDPAppendAll').addEventListener('click', createRightDP);
  document.getElementById('btnDPRefresh').addEventListener('click', refreshList);

  let dpListDefault = document.createElement('img');
  dpListDefault.src = defaultIMG;
  dpListDefault.id = 'dpListDefault';
  dpListDefault.className = 'js-dp-from-list c-dp--list';
  dpListDefault.addEventListener('dragstart', function(e) {
    e.target.style.opacity = .5;
    e.dataTransfer.setData('text', e.target.id);
  });
  dpListDefault.addEventListener('dragend', function(e) {
    e.target.style.opacity = 1;
  });
  dpListContainer.append(dpListDefault);


  //Presets
  document.getElementById('btnPresetAdd').addEventListener('click', () => presetImageUpload.click());
  presetImageUpload.addEventListener('change', addPreset);
  document.getElementById('btnPresetDelete').addEventListener('click', deletePreset);
  document.getElementById('defaultPreset').addEventListener('click', togglePreset);
  document.getElementById('defaultPresetLabel').addEventListener('click', togglePreset);

  let presetDefault = document.createElement('img');
  presetDefault.src = defaultIMG;
  presetDefault.className = 'js-default-img';
  document.getElementById('defaultPreset').prepend(presetDefault);

  
  //Save
  document.getElementById('btnSave').addEventListener('click', saveToImage);

  //Images
  document.getElementById('btnImageUpload').addEventListener('click', () => imageUpload.click());
  imageUpload.addEventListener('change', addImages);
  document.getElementById('btnImageUnselect').addEventListener('click', unselectImage);
  document.getElementById('btnImageDelete').addEventListener('click', deleteImage);

} ());

