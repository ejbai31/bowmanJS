import { distance, angle } from './utils';

var arrows = [];
var speedDiv = 4;

function Arrow() {
  this.x = shootingCirc.x;
  this.y = shootingCirc.y;
  this.arrowTipCoords = {
    x: this.x + 25,
    y: this.y
  };

  this.leftTipCoords = {
    x: this.x + 17,
    y: this.y - 3
  };
  this.rightTipCoords = {
    x: this.x + 17,
    y: this.y + 3
  };
  this.velX = 0;
  this.velY = 0;
  this.velocity = 0;
  this.firing = false;
}

Arrow.prototype.fireArrow = function () {
  if (mousePos && !this.firing) {
    this.velocity = Math.min(shootingCirc.r, distance(shootingCirc, mousePos)) / speedDiv;
    this.velX = Math.cos(angle(mousePos, shootingCirc)) * this.velocity;
    this.velY = Math.sin(angle(mousePos, shootingCirc)) * this.velocity;
    this.firing = true;
    addArrow();
  }
};

Arrow.prototype.calcTrajectory = function () {
  if (this.y <= groundPoint && (this.x <= target.x - 30 && this.y <= target.y + 20) && this.firing) {
    this.velY += gravity;
    this.x += this.velX;
    this.y += this.velY;
  } else {
    this.velX = 0;
    this.velY = 0;
    this.firing = false;
  }
};

Arrow.prototype.calcArrowHead = function () {
  if (this.firing) {
    var headAngle = Math.atan2(this.velX, this.velY);
  } else if (mousePos && this == currentArrow) {
    var headAngle = Math.PI / 2 - angle(mousePos, shootingCirc);
  } else return;

  this.arrowTipCoords.x = this.x + 30 * Math.sin(headAngle);
  this.arrowTipCoords.y = this.y + 30 * Math.cos(headAngle);
  var arrowTip = { x: this.arrowTipCoords.x, y: this.arrowTipCoords.y };

  this.leftTipCoords.x = arrowTip.x - 3 * Math.sin(headAngle - Math.PI / 4);
  this.leftTipCoords.y = arrowTip.y - 3 * Math.cos(headAngle - Math.PI / 4);
  this.rightTipCoords.x = arrowTip.x - 3 * Math.sin(headAngle + Math.PI / 4);
  this.rightTipCoords.y = arrowTip.y - 3 * Math.cos(headAngle + Math.PI / 4);

  // console.log(this.arrowTipCoords.x, this.arrowTipCoords.y);
};

Arrow.prototype.drawArrow = function () {
  this.calcTrajectory();
  this.calcArrowHead();
  var arrowTip = this.arrowTipCoords;
  var leftTip = this.leftTipCoords;
  var rightTip = this.rightTipCoords;

  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(arrowTip.x, arrowTip.y);

  ctx.moveTo(arrowTip.x, arrowTip.y);
  ctx.lineTo(leftTip.x, leftTip.y);

  ctx.moveTo(arrowTip.x, arrowTip.y);
  ctx.lineTo(rightTip.x, rightTip.y);

  ctx.strokeStyle = "black";
  ctx.stroke();
};



var canvas = document.createElement("canvas");
canvas.id = 'canvas';
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 15;
canvas.height = window.innerHeight - 15;
document.body.appendChild(canvas);
let cWidth = canvas.width;
let cHeight = canvas.height;

var gravity = 0.4;
var groundPoint = cHeight - (cHeight / 4);

var drawnBack = false;
var firedArrow = false;

var isInLimit = function (mousePos) {
  var distFromCenter = distance(drawBackCirc, mousePos);
  if (distFromCenter < drawBackCirc.r) {
    return true;
  } else {
    return false;
  }
};

function getMousePos(canvas, e) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}


var mousePos;
var mouseDown = false;
var mouseUp = false;

addEventListener("mousemove", function (e) {
  mousePos = getMousePos(canvas, e);
}, false);

addEventListener("mousedown", function (e) {
  mousePos = getMousePos(canvas, e);
  mouseDown = true;
  mouseUp = false;
}, false);

addEventListener("mouseup", function (e) {
  mousePos = getMousePos(canvas, e);
  mouseUp = true;
  mouseDown = false;
}, false);

var drawScene = function () {
  var ground = groundPoint + 15;
  ctx.beginPath();
  ctx.moveTo(0, ground);
  ctx.lineTo(cWidth, ground);
  ctx.strokeStyle = "rgba(0,100,50,0.6)";
  ctx.stroke();
  ctx.fillStyle = "rgba(0,200,100,1)";
  ctx.fillRect(0, ground, cWidth, cHeight);
};


var getAimCoords = function (mousePos) {
  var aimAng = Math.PI / 2 - angle(mousePos, shootingCirc);
  var aimDistance = Math.min(distance(shootingCirc, mousePos), shootingCirc.r);
  var x = shootingCirc.x + -aimDistance * Math.sin(aimAng);
  var y = shootingCirc.y + -aimDistance * Math.cos(aimAng);
  return { x: x, y: y };
};

var drawAimer = function () {
  if (drawnBack) {
    var aimCoords = getAimCoords(mousePos);
    ctx.beginPath();
    ctx.moveTo(aimCoords.x, aimCoords.y);
    ctx.lineTo(shootingCirc.x, shootingCirc.y);
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    ctx.stroke();
  }
};
var shootingCirc = {
  x: 200,
  y: groundPoint - 150,
  r: 100
};

var drawBackCirc = {
  x: shootingCirc.x,
  y: shootingCirc.y,
  r: 25
};

var drawCircles = function () {
  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  // ctx.stroke();
  ctx.beginPath();
  ctx.arc(drawBackCirc.x, drawBackCirc.y, drawBackCirc.r, 0, 2 * Math.PI);
  ctx.lineWidth = 10;
  ctx.stroke();
  drawAimer();
};

// document.addEventListener("DOMContentLoaded", () => {
//   const canvasEl = document.getElementById("canvas");
//   canvasEl.width = window.innerWidth - 15;
//   canvasEl.height = window.innerHeight - 15;
//   let canvasWidth = canvasEl.width;
//   let canvasHeight = canvasEl.height;
//   let groundPoint = canvasHeight * (3 / 4);
//   const ctx = canvasEl.getContext("2d");
//   document.body.appendChild(canvasEl);
//   // const arrow = new Arrow();
//   // arrow.draw(ctx);
//   const game = new Game();
//   new View(game, ctx).start();
// });