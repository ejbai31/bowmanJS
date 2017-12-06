var gravity = 0.5;

var speedMod = 4;


export const Distance = (p1, p2) => {
  return Math.sqrt(Math.pow((p2.x - p1.x), 2)
    + Math.pow((p2.y - p1.y), 2));
};

export const Angle = (p1, p2) => {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};