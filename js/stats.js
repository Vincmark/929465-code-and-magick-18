'use strict';

// constants
var NAME_LIST = ['Кекс', 'Катя', 'Игорь', 'Антон', 'Марина', 'Наташа', 'Алёна', 'Света', 'Андрей', 'Василий', 'Егор', 'Владимир', 'Олег', 'Вероника', 'Татьяна', 'Александр', 'Евгений', 'Ольга', 'Роман', 'Мария'];
var PLAYERS_CNT = 4;

var names = ['Вы'];
var times = [];


var getNames = function () {
  for (var i = 0; i <= PLAYERS_CNT - 2; i++) {
    names.push(NAME_LIST [getRandomInt(0, NAME_LIST.length - 1)]);
  }
};

var getTimes = function () {
  for (var i = 0; i <= names.length - 1; i++) {
    times.push(getRandomInt(1000, 5000));
  }
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var drawResult = function (index, ctx) {
  var MAX_BAR_HEIGHT = 150;
  var X_START = 150;
  var Y_START = 250;
  var BAR_WIDTH = 40;

  var barHeight = Math.round(MAX_BAR_HEIGHT * (times[index] / Math.max(...times)));
  var barColor;
  if (index === 0) {
    barColor = 'rgba(255, 0, 0, 1)';
  } else {
    var colorSaturation = getRandomInt(2, 10) * 10;
    barColor = 'hsl(240, ' + colorSaturation + '%, 50%)';
  }
  var xPos = X_START + index*90;
  var yPos = Y_START;

  // draw bar
  ctx.fillStyle = barColor;
  ctx.fillRect(xPos, yPos - barHeight - 10, BAR_WIDTH, barHeight);

  // draw score
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(times[index], xPos, yPos - barHeight - 30);

  // draw name
  ctx.fillText(names[index], xPos, yPos);


};

window.renderStatistics = function (ctx) {

  getNames();
  getTimes();

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 120, 30);
  ctx.fillText('Список результатов:', 120, 50);

  for (var i = 0; i <= names.length - 1; i++) {
    drawResult(i, ctx);
  }

};
