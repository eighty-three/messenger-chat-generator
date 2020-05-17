export const messagesContainer = document.querySelector('.js-messages');

export const dpListContainer = document.querySelector('.js-dp-list-container');

export const presetsContainer = document.querySelector('.js-presets');
export const presetImageUpload = document.querySelector('.js-preset-upload');
export const presetImages = document.querySelector('.js-preset-imgs');
export const defaultPreset = document.querySelector('.js-preset-default');

export const imagesContainer = document.querySelector('.js-images-container');
export const imageUpload = document.querySelector('.js-image-upload');

export const counters = {
  'totalPresets': 1,
  'totalImages': 0,
  'presetId': 0 //Prevent ID collision when deleting a preset and then creating a new one immediately
};

export const displayPictures = {
  'list': [],
  'previous': [],
  'inUse': []
};

