export const setTextEditable = (el) => {
  el.contentEditable = true;
  el.spellcheck = false;
  el.innerHTML = 'Edit this text';
};

