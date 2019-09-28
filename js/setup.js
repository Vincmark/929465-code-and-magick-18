'use strict';

var FIRST_NAMES_LIST = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES_LIST = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var MANTLE_COLORS_LIST = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS_LIST = ['black', 'red', 'blue', 'yellow', 'green'];
var CHARACTERS_COUNT = 4;

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
showSetupWindow();

// get similar wizard template
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// render similar players list to a fragment
var fragment = new DocumentFragment();
renderSimilarPlayers(fragment);

// add fragment with similar players list to the DOM
addFragmentToDOM(fragment);

// show similar players list in the DOM
showSimilarPlayersList();


var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
setupOpen.addEventListener('click', onSetupOpen);
setupClose.addEventListener('click', onSetupClose);

var onSetupOpen = function () {
  alert ('Setup Open');
};

var onSetupClose = function () {
  alert ('Setup Close');
};
