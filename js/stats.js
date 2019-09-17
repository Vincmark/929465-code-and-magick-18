'use strict';

var MAX_BAR_HEIGHT = 150;
var X_START = 150;
var Y_START = 250;
var BAR_WIDTH = 40;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomBlueColor = function () {
  var colorSaturation = getRandomInt(2, 10) * 10;
  return 'hsl(240, ' + colorSaturation + '%, 50%)';
};

var drawBar = function (ctx, barColor, xPos, yPos, barHeight) {
  ctx.fillStyle = barColor;
  ctx.fillRect(xPos, yPos - barHeight - 10, BAR_WIDTH, barHeight);
};

var drawScore = function (ctx, score, xPos, yPos, barHeight) {
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(Math.round(score).toString(), xPos, yPos - barHeight - 30);
};

var drawName = function (ctx, name, xPos, yPos) {
  ctx.fillText(name, xPos, yPos);
};

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

var drawResult = function (index, ctx, names, times) {
  var barHeight = Math.round(MAX_BAR_HEIGHT * (times[index] / getMaxOfArray(times)));
  var barColor;
  if (index === 0) {
    barColor = 'rgba(255, 0, 0, 1)';
  } else {
    barColor = getRandomBlueColor();
  }
  var xPos = X_START + index * 90;
  var yPos = Y_START;

  // draw bar
  drawBar(ctx, barColor, xPos, yPos, barHeight);

  // draw score
  drawScore(ctx, times[index], xPos, yPos, barHeight);

  // draw name
  drawName(ctx, names[index], xPos, yPos);
};

window.renderStatistics = function (ctx, names, times) {
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
    drawResult(i, ctx, names, times);
  }
};
