const NORMAL_FRAME_TIME_DELTA = 1000 / 60;



class MovingObjects {
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.game = options.game;
  }


  // asteroids example for change render
  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel[0] * velocityScale,
      offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  }

}
