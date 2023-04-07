export const messagesContainer = document.getElementById('messagesContainer');

export const dpListContainer = document.getElementById('dpListContainer');

//Presets
export const presetsContainer = document.getElementById('presetContainer');
export const presetImageUpload = document.getElementById('presetImageUpload');
export const presetImages = document.getElementById('presetImages');
export const defaultPreset = document.getElementById('defaultPreset');

//Images
export const imagesContainer = document.getElementById('imagesContainer');
export const imageUpload = document.getElementById('imagesUpload');

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

