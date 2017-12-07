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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Arrow {
  constructor(options){
    this.ctx = options.ctx;
    this.angle = options.angle;
    this.velocity = options.velocity;
    this.game = options.game;
  }


  

  draw(ctx){
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
  }
  

}

/* harmony default export */ __webpack_exports__["a"] = (Arrow);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__view_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__arrow_js__ = __webpack_require__(0);




document.addEventListener("DOMContentLoaded", ()=> {
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = window.innerWidth - 15;
  canvasEl.height = window.innerHeight - 15;
  let canvasWidth = canvasEl.width;
  let canvasHeight = canvasEl.height;
  let groundPoint = canvasHeight * (3/4);
  const ctx = canvasEl.getContext("2d");
  document.body.appendChild(canvasEl);
  // const arrow = new Arrow();
  // arrow.draw(ctx);
  const game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */]();
  new __WEBPACK_IMPORTED_MODULE_1__view_js___default.a(game, ctx).start();
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__arrow_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(3);



var speedMod = 4;



class Game {
  constructor(){
    this.arrows = []; 

    this.addArrow();
  }

  addArrow(){
    this.arrows.unshift(new __WEBPACK_IMPORTED_MODULE_0__arrow_js__["a" /* default */]());
    var currArrow = this.arrows[0];
  }

  arrowLimit(){
    var distFromCenter = Object(__WEBPACK_IMPORTED_MODULE_1__utils_js__["a" /* distance */])(drawBackCirc, mousePos);
    if (distFromCenter < drawBackCirc.r){
      return true;
    }else{
      return false;
    }
  } 
}


Game.DIM_X = 5000;
Game.DIM_Y = 5000;
/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var gravity = 0.5;

var speedMod = 4;


const distance = (p1, p2) => {
  return Math.sqrt(Math.pow((p2.x - p1.x), 2)
    + Math.pow((p2.y - p1.y), 2));
};
/* harmony export (immutable) */ __webpack_exports__["a"] = distance;


const angle = (p1, p2) => {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};
/* unused harmony export angle */


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class View {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.arrow = this.arrow.addArrow();
  }


  drawScene(){
    var ground = groundPoint + 15;
    // sky
    // ctx.fillStyle="rgba(0,0,200,0.2)";
    // ctx.fillRect(0,0,cWidth,ground);
    // ground
    this.ctx.beginPath();
    this.ctx.moveTo(0, ground);
    this.ctx.lineTo(canvasWidth, ground);
    this.ctx.strokeStyle = "rgba(0,100,50,0.6)";
    this.ctx.stroke();
    this.ctx.fillStyle = "rgba(0,200,100,0.6)";
    this.ctx.fillRect(0, ground, canvasWidth, canvasHeight);
  }
  
}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map