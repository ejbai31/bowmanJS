import Arrow from './arrow.js';
import { distance } from './utils.js';

var speedMod = 4;



class Game {
  constructor(){
    this.arrows = []; 

    this.addArrow();
  }

  addArrow(){
    this.arrows.unshift(new Arrow());
    var currArrow = this.arrows[0];
  }

  arrowLimit(){
    var distFromCenter = distance(drawBackCirc, mousePos);
    if (distFromCenter < drawBackCirc.r){
      return true;
    }else{
      return false;
    }
  } 
}


Game.DIM_X = 5000;
Game.DIM_Y = 5000;
export default Game;