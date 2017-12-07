import Game from './game.js';
import View from './view.js';
import Arrow from './arrow.js';

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
  const game = new Game();
  new View(game, ctx).start();
});