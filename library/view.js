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
    //TODO add picture
    this.ctx.beginPath();
    this.ctx.moveTo(0, ground);
    this.ctx.lineTo(canvasWidth, ground);
    this.ctx.strokeStyle = "rgba(0,100,50,0.6)";
    this.ctx.stroke();
    this.ctx.fillStyle = "rgba(0,200,100,0.6)";
    this.ctx.fillRect(0, ground, canvasWidth, canvasHeight);
  }
  
}