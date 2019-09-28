'use strict';

var FIRST_NAMES_LIST = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES_LIST = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var MANTLE_COLORS_LIST = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS_LIST = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS_LIST = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var CHARACTERS_COUNT = 4;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var characters = [];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomName = function () {
  return FIRST_NAMES_LIST [getRandomInt(0, FIRST_NAMES_LIST.length - 1)] + ' ' + SECOND_NAMES_LIST [getRandomInt(0, SECOND_NAMES_LIST.length - 1)];
};

var getRandomCoatColor = function () {
  return MANTLE_COLORS_LIST [getRandomInt(0, MANTLE_COLORS_LIST.length - 1)];
};

var getRandomEyeColor = function () {
  return EYE_COLORS_LIST [getRandomInt(0, EYE_COLORS_LIST.length - 1)];
};

var getRandomFireballColor = function () {
  return FIREBALL_COLORS_LIST [getRandomInt(0, FIREBALL_COLORS_LIST.length - 1)];
};

var createCharacters = function () {
  for (var i = 0; i < CHARACTERS_COUNT; i++) {
    var character = {
      name: getRandomName(),
      coatColor: getRandomCoatColor(),
      eyeColor: getRandomEyeColor()
    };
    characters.push(character);
  }
};

var showSetupWindow = function () {
  var magicSetupWindow = document.querySelector('.setup');
  magicSetupWindow.classList.remove('hidden');
};

var renderSimilarPlayers = function (fragment) {
  for (var i = 0; i < CHARACTERS_COUNT; i++) {
    fragment.appendChild(getSimilarPlayer(similarWizardTemplate, i));
  }
  return fragment;
};

var getSimilarPlayer = function (template, index) {
  var similarWizardElement = template.cloneNode(true);
  similarWizardElement.querySelector('.setup-similar-label').textContent = characters[index].name;
  similarWizardElement.querySelector('.wizard-coat').style.fill = characters[index].coatColor;
  similarWizardElement.querySelector('.wizard-eyes').style.fill = characters[index].eyeColor;
  return (similarWizardElement);
};

var addFragmentToDOM = function (fragment) {
  var similarList = document.querySelector('.setup-similar-list');
  similarList.appendChild(fragment);
};

var showSimilarPlayersList = function () {
  var similarListWindow = document.querySelector('.setup-similar');
  similarListWindow.classList.remove('hidden');
};

createCharacters();

// show player setup window
//showSetupWindow();

// get similar wizard template
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// render similar players list to a fragment
var fragment = new DocumentFragment();
renderSimilarPlayers(fragment);

// add fragment with similar players list to the DOM
addFragmentToDOM(fragment);

// show similar players list in the DOM
showSimilarPlayersList();

var setupWindow = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var userNameInput = setupWindow.querySelector('.setup-user-name');

var setupWizard = document.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireballWrap = document.querySelector('.setup-fireball-wrap');
var setupUserName = document.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function (evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (document.activeElement !== setupUserName) {
      closePopup();
    }
  }
};

var openPopup = function () {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function() {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var changeWizardCoatColor = function () {
  var newWizardCoatColor = getRandomCoatColor();
  wizardCoat.style.fill = newWizardCoatColor;
  var input = document.getElementsByName('coat-color');
  input[0].value = newWizardCoatColor;

};

var changeWizardEyeColor = function () {
  var newWizardEyeColor = getRandomEyeColor();
  wizardEyes.style.fill = newWizardEyeColor;
  var input = document.getElementsByName('eyes-color');
  input[0].value = newWizardEyeColor;
};

var changeWizardFireballWrapColor = function () {
  var newWizardFireballWrapColor = getRandomFireballColor();
  setupFireballWrap.style.backgroundColor = newWizardFireballWrapColor;
  var input = document.getElementsByName('fireball-color');
  input[0].value = newWizardFireballWrapColor;
};

wizardCoat.addEventListener('click', function () {
  changeWizardCoatColor();
});

wizardEyes.addEventListener('click', function () {
  changeWizardEyeColor();
});

setupFireballWrap.addEventListener('click', function () {
  changeWizardFireballWrapColor();
});
