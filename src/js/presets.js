import { presetImages, presetsContainer, counters, presetImageUpload, defaultPreset, dpListContainer } from './constants';

export const togglePreset = (e) => {
  let selectedPreset = document.querySelector('input[name="presetSelect"]:checked + .js-preset-selected');
  let selectedPresetNameField = document.querySelector('.js-preset-selected .js-name-field');
  if (
    e.target.parentNode.classList.contains('js-preset-compressed')
    || e.target.classList.contains('js-preset-compressed')
  ) {
    //If clicked during compressed form
    if (
      selectedPreset 
      && selectedPreset.nextElementSibling !== defaultPreset
    ) { //For unselecting previous selected preset
      selectedPreset.style.display = 'none';
      selectedPreset.nextElementSibling.style.display = 'flex';
      selectedPreset.nextElementSibling.lastElementChild.textContent = (selectedPresetNameField.value !== '')
        ? selectedPresetNameField.value 
        : 'Name' ;
      selectedPreset.classList.toggle('js-preset-selected');
    }
    
    let toShowPreset = (e.target.classList.contains('js-preset-compressed'))
      ? e.target //Sometimes the div itself is being clicked instead of the span that it contains
      : e.target.parentNode;
    let toShow = toShowPreset.previousElementSibling;
    toShow.previousElementSibling.checked = 'checked';
    toShow.classList.toggle('js-preset-selected');
    if (toShowPreset !== defaultPreset) {
      toShowPreset.style.display = 'none';
      toShow.style.display = 'flex';
    }

  } else if (
    selectedPreset.contains(e.target) 
    && !(e.target.tagName === 'INPUT')
  ) { //If clicked during uncompressed form, and not changing the name (aka pressing input)
    let toShow = document.querySelector('input[type="radio"]:checked ~ .js-preset-compressed');
    selectedPreset.style.display = 'none';
    toShow.lastElementChild.textContent = (selectedPresetNameField.value !== '')
      ? selectedPresetNameField.value
      : 'Name';
    toShow.style.display = 'flex';
  }
};

export const addPreset = () => {
  let fileUploads = presetImageUpload.files;
  let filesTotal = fileUploads.length;
  for (let i=0; i < filesTotal; i++) {
    let newPreset = document.createElement('div');
    newPreset.className = 'c-presets__preset';
    
    let presetRadio = document.createElement('input');
    presetRadio.id = `preset-${counters.totalPresets}`;
    presetRadio.type = 'radio';
    presetRadio.name = 'presetSelect';
    presetRadio.value = counters.totalPresets;
    
    let presetLabel = document.createElement('label');
    presetLabel.setAttribute('for', presetRadio.id);
    presetLabel.className = 'c-presets__label';
    presetLabel.addEventListener('click', togglePreset);
    
    let presetInputs = document.createElement('div');
    presetInputs.className = 'c-presets__inputs-container';
    
    let nameField = document.createElement('input');
    nameField.id = `nameField-${counters.totalPresets}`;
    nameField.className = 'c-input--preset js-name-field';
    nameField.type = 'text';
    nameField.maxLength = '60';
    nameField.placeholder = 'Insert Name';
    nameField.spellcheck = false;
    
    let presetCompressed = document.createElement('div');
    presetCompressed.className = 'c-presets__label--compressed js-preset-compressed';
    presetCompressed.addEventListener('click', togglePreset);
    
    let newImage = document.createElement('img');
    newImage.src = URL.createObjectURL(fileUploads[i]);
    newImage.className = `js-${counters.presetId}`;
    nameField.value = fileUploads[i].name
      .substr(0, fileUploads[i].name.lastIndexOf('.')) //strip filename extension
      .substr(0, 60); //60 characters max

    let newImageCompressed = newImage.cloneNode(true);

    let name = document.createElement('span');
    name.className = 'h-f4';
    name.textContent = nameField.value;

    let dpListNewImage = newImage.cloneNode(true);
    dpListNewImage.className = 'c-dp--list js-dp-from-list';
    dpListNewImage.id = `js-${counters.presetId}-dp`;

    dpListNewImage.addEventListener('dragstart', function(e) {
      e.target.style.opacity = .5;
      e.dataTransfer.setData('text', e.target.id);
    });

    dpListNewImage.addEventListener('dragend', function(e) {
      e.target.style.opacity = 1;
    });

    dpListContainer.append(dpListNewImage);      

    presetImages.append(newImage);
    presetsContainer.append(newPreset);
    newPreset.append(presetRadio, presetLabel, presetCompressed);
    presetLabel.append(presetInputs);
    presetInputs.append(nameField);
    presetCompressed.append(newImageCompressed, name);
    counters.presetId++;
    counters.totalPresets++;
  }
};

export const deletePreset = () => {
  if (presetsContainer.firstElementChild !== presetsContainer.lastElementChild) {
    let selectedPreset = document.querySelector('input[name="presetSelect"]:checked');
    if (selectedPreset.parentNode !== defaultPreset.parentNode) {
      selectedPreset.parentNode.remove();
      defaultPreset.parentNode.firstElementChild.checked = 'checked';
    } else {
      presetsContainer.lastElementChild.remove();
    }

    counters.totalPresets--;
  }
};

