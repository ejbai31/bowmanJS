import Arrow from './arrow.js';

var speedMod = 4;



class Game {
  constructor(){
    this.arrows = []; 
  }

  addArrow (){
    this.arrows.unshift(new Arrow());
    var currArrow = this.arrows[0];
  }
  
}


Game.DIM_X = 5000;
Game.DIM_Y = 5000;
export default Game;