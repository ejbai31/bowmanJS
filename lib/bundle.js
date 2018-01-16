/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);


var arrows = [];
var speedDiv = 4;
var gameOver = false;
var score = 0;
var arrowCount = 3;

var addArrow = function () {
  arrows.unshift(new Arrow());
  currentArrow = arrows[0];
};

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
    this.velocity = Math.min(shootingCirc.r, Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* distance */])(shootingCirc, mousePos)) / speedDiv;
    this.velX = Math.cos(Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* angle */])(mousePos, shootingCirc)) * this.velocity;
    this.velY = Math.sin(Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* angle */])(mousePos, shootingCirc)) * this.velocity;
    this.firing = true;
    attempts();
    addArrow();
    console.log(arrowCount);
    document.getElementById("shots-left").innerHTML = arrowCount;
  }
};

Arrow.prototype.calcTrajectory = function () {
  if(this.firing){
    if (this.y <= groundPoint && (this.x <= target.x - 30 && this.y <= target.y + 20)) {
      this.velY += gravity;
      this.x += this.velX;
      this.y += this.velY;
    } else {
      this.velX = 0;
      this.velY = 0;
      this.firing = false;
      score();
    }
} 
};

Arrow.prototype.calcArrowHead = function () {
  if (this.firing) {
    var headAngle = Math.atan2(this.velX, this.velY);
  } else if (mousePos && this == currentArrow) {
    var headAngle = Math.PI / 2 - Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* angle */])(mousePos, shootingCirc);
  } else return;

  this.arrowTipCoords.x = this.x + 30 * Math.sin(headAngle);
  this.arrowTipCoords.y = this.y + 30 * Math.cos(headAngle);
  var arrowTip = { x: this.arrowTipCoords.x, y: this.arrowTipCoords.y };

  this.leftTipCoords.x = arrowTip.x - 3 * Math.sin(headAngle - Math.PI / 4);
  this.leftTipCoords.y = arrowTip.y - 3 * Math.cos(headAngle - Math.PI / 4);
  this.rightTipCoords.x = arrowTip.x - 3 * Math.sin(headAngle + Math.PI / 4);
  this.rightTipCoords.y = arrowTip.y - 3 * Math.cos(headAngle + Math.PI / 4);

  console.log(this.arrowTipCoords.x, this.arrowTipCoords.y);
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
  var distFromCenter = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* distance */])(drawBackCirc, mousePos);
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
  var aimAng = Math.PI / 2 - Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* angle */])(mousePos, shootingCirc);
  var aimDistance = Math.min(Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* distance */])(shootingCirc, mousePos), shootingCirc.r);
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
  ctx.beginPath();
  ctx.arc(drawBackCirc.x, drawBackCirc.y, drawBackCirc.r, 0, 2 * Math.PI);
  ctx.lineWidth = 10;
  ctx.stroke();
  drawAimer();
};

var target = {
  x: cWidth * (0.95),
  y: groundPoint - 60
};

var drawTarget = function () {
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.ellipse(target.x, target.y, 50, 75, 0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.ellipse(target.x, target.y, 25, 37.5, 0, 0, 2 * Math.PI);
  ctx.stroke();
};

var isFiredArrow = function () {
  if (mousePos && drawnBack && mouseUp) {
    drawnBack = false;
    firedArrow = true;
  }
};

var isDrawnBack = function () {
  if (mousePos && isInLimit(mousePos)) {
    if (mouseDown) drawnBack = true;
    else if (mouseUp) drawnBack = false;
  }
};

var writeInfo = function (mousePos) {
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = "black";
  
  ctx.fillText("Mouse Position: " + mousePos.x + ", " + mousePos.y, 20, 20);
  ctx.fillText("Circle Position: " + shootingCirc.x + ", " + shootingCirc.y, 20, 40);
  ctx.fillText("Angle: " + Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* angle */])(mousePos, shootingCirc), 20, 60);
};

var attempts = function() {
  if(arrows.length > 0){
    
    arrowCount = arrowCount - 1;
    document.getElementById("shots-left").innerHTML = arrowCount;
  }
  if(arrows.length >= 3){
    // console.log("hi");
    gameOver();
  }
};

var score = function(){
  let currentArrow = arrows[0];
  currentArrow.calcArrowHead();
  
  if(
    currentArrow.arrowTipCoords.y < target.y + 37.5 &&
    currentArrow.arrowTipCoords.y > target.y - 37.5){
      score += 2; 
      document.getElementById("score").innerHTML = score;
    }
};

var update = function () {
  isDrawnBack();
  isFiredArrow();
  if (firedArrow) {
    currentArrow.fireArrow();
    firedArrow = false;
  }

  ctx.clearRect(0, 0, cWidth, cHeight);
};

var render = function () {
  if (mousePos) writeInfo(mousePos);
  drawCircles();
  drawTarget();
  for (let i = 0; i < arrows.length; i++) {
    arrows[i].drawArrow();
  }
  drawScene();
};


var main = function () {
  update();
  render();
  requestAnimationFrame(main);
};

var reset = function (){
  gameOver = false;
};

var gameOver = function (){
  document.getElementById("game-over").classList.remove("hide");
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
addArrow();
var currentArrow = arrows[0];
main();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const distance = (p1, p2) => {
  return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
};
/* harmony export (immutable) */ __webpack_exports__["b"] = distance;


const angle = (p1, p2) => {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = angle;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map