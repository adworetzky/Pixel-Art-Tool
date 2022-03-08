// A small tool to pixelize an image uploaded by a user with Orchard brand colors acting as the pseudo palette. Made for the Orchard Hackathon May 2022
//Built using Pixelit.js
//https://giventofly.github.io/pixelit/#docs

/* 
  .oooooo.                      oooo                                 .o8  
 d8P'  `Y8b                     `888                                "888  
888      888 oooo d8b  .ooooo.   888 .oo.    .oooo.   oooo d8b  .oooo888  
888      888 `888""8P d88' `"Y8  888P"Y88b  `P  )88b  `888""8P d88' `888  
888      888  888     888        888   888   .oP"888   888     888   888  
`88b    d88'  888     888   .o8  888   888  d8(  888   888     888   888  
 `Y8bood8P'  d888b    `Y8bod8P' o888o o888o `Y888""8o d888b    `Y8bod88P" 
*/

let imgPath = 'assets/16_CompetitiveOffer.png';
let resSlider;
const brandColors = [
  [49, 50, 76],
  [167, 233, 241],
  [0, 139, 148],
  [209, 88, 64],
  [239, 237, 233],
  [244, 216, 204],
];
const brandColorsSimple = [
  [49, 50, 76],
  [167, 233, 241],
  [239, 237, 233],
  [244, 216, 204],
];

const init = () => {
  // set up and append elements to the dom
  // LOGO
  const logoImg = document.createElement('img');
  logoImg.src = 'assets/Lockup.svg';
  logoImg.id = 'logo-img';
  document.body.appendChild(logoImg);
  const uiContainer = document.createElement('div');
  uiContainer.id = 'ui-container';
  document.body.append(uiContainer);
  // UPLOAD
  const fileInput = document.createElement('input');
  fileInput.id = 'file-input';
  fileInput.type = 'file';
  const inputLabel = document.createElement('label');
  inputLabel.setAttribute('for', 'file-input');
  inputLabel.id = 'input-label';
  inputLabel.textContent = 'Upload a File';
  uiContainer.appendChild(inputLabel);
  uiContainer.appendChild(fileInput);
  // SAVE BUTTON
  const saveButton = document.createElement('div');
  saveButton.id = 'save-button';
  saveButton.textContent = 'Save Image';
  uiContainer.appendChild(saveButton);
  // SLIDER
  const sliderContainer = document.createElement('div');
  sliderContainer.id = 'slider-container';
  uiContainer.appendChild(sliderContainer);
  resSlider = document.createElement('input');
  resSlider.type = 'range';
  resSlider.id = 'res-slider';
  resSlider.min = 1;
  resSlider.max = 30;
  resSlider.value = 8;
  const sliderLabel = document.createElement('label');
  sliderLabel.setAttribute('for', 'res-Slider');
  sliderLabel.id = 'slider-label';
  sliderLabel.textContent = 'Resolution:' + resSlider.value;
  sliderContainer.appendChild(sliderLabel);
  sliderContainer.appendChild(resSlider);
  // IMG
  const i = document.createElement('img');
  i.id = 'pixelitimg';
  document.body.appendChild(i);
  // CANVAS
  const c = document.createElement('canvas');
  c.id = 'pixelitcanvas';
  document.body.appendChild(c);

  // listeners
  i.onload = function () {
    pixelate.init();
  };
  fileInput.onchange = function () {
    console.log(fileInput.files[0]);
    let i = document.querySelector('#pixelitimg');
    i.src = URL.createObjectURL(fileInput.files[0]);

    console.log('File Uploaded');
  };
  resSlider.onchange = function () {
    sliderLabel.textContent = 'Resolution:' + resSlider.value;
    pixelate.init();
  };
  // Save is a bit weird on mobile, works in safari but not in chrome. Cordova packaging has a fix but should wait to see if anyone actually cares...
  saveButton.onclick = function () {
    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = c
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    console.log(link.href);
    link.click();
    link.delete;
  };

  // set initial src of starter img
  i.src = imgPath;
};

const pixelate = {
  init: function () {
    // pass in previously locally scoped variables
    const c = document.querySelector('#pixelitcanvas');
    const i = document.querySelector('#pixelitimg');

    // main Pixelizer function
    const px = new pixelit();
    px.setScale(resSlider.value)
      .setPalette(brandColors)
      .draw()
      .pixelate()
      // .convertGrayscale()
      .convertPalette();
  },
};

// wait for window to load to start process
window.onload = init();
