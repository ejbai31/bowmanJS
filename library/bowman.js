import Game from './game.js';
import View from './view.js';
import Arrow from './arrow.js';

document.addEventListener("DOMContentLoaded", ()=> {
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = window.innerWidth - 10;
  canvasEl.height = window.innerHeight - 10;

  const ctx = canvasEl.getContext("2d");

  // const arrow = new Arrow();
  // arrow.draw(ctx);
  const game = new Game();
  new View(game, ctx).start();
});