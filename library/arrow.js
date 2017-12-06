
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

export default Arrow;