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


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = window.innerWidth - 15;
  canvasEl.height = window.innerHeight - 15;
  let canvasWidth = canvasEl.width;
  let canvasHeight = canvasEl.height;
  let groundPoint = canvasHeight * (3 / 4);
  const ctx = canvasEl.getContext("2d");
  document.body.appendChild(canvasEl);
  // const arrow = new Arrow();
  // arrow.draw(ctx);
  const game = new Game();
  new View(game, ctx).start();
});