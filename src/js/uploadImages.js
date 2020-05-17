import { imagesContainer, imageUpload, counters } from './constants';

export const unselectImage = () => { //Unselecting radio, in case of misclick
  let selected = document.querySelector('input[name="imageSelect"]:checked');
  if (selected) selected.checked = false;
};

export const addImages = () => {
  let fileUploads = imageUpload.files;
  let filesTotal = fileUploads.length;
  for (let i=0; i < filesTotal; i++) {
    let newImage = document.createElement('img');
    newImage.src = URL.createObjectURL(fileUploads[i]);
    newImage.onload = function () {
      newImage.className = 'c-images__img';
    };

    let newImageContainer = document.createElement('div');
    newImageContainer.className = 'c-images__img-container';

    let radio = document.createElement('input');
    radio.type = 'radio';
    radio.id = `image-${counters.totalImages}`;
    radio.name = 'imageSelect';
    radio.value = counters.totalImages;

    let label = document.createElement('label');
    label.setAttribute('for', radio.id);
    label.className = 'c-images__label';

    imagesContainer.append(newImageContainer);
    newImageContainer.append(radio, label);
    label.append(newImage);
    counters.totalImages++;
  }

  let btn = document.getElementById('btnImageUpload');
  btn.innerText = 'Upload Successful!';
  setTimeout(function () { //Delay turning back the text
    btn.innerText = 'Upload Images';
  }, 2000);
};

export const deleteImage = () => {
  let selectedImage = document.querySelector('input[name="imageSelect"]:checked');
  if (imagesContainer.firstElementChild) {
    (selectedImage)
      ? selectedImage.parentNode.remove()
      : imagesContainer.lastElementChild.remove();
  }
};

