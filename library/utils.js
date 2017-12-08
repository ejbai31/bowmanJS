var gravity = 0.5;

var speedMod = 4;


export const distance = (p1, p2) => {
  return Math.sqrt(Math.pow((p2.x - p1.x), 2)
    + Math.pow((p2.y - p1.y), 2));
};

export const angle = (p1, p2) => {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};

export const getAimCoords = (mousePos) => {
  /* NOTE: angleBetween(p1, p2) is 180deg opposite of angleBetween(p2, p1) */
  var aimAng = Math.PI / 2 - angle(mousePos, shootingCirc);
  var aimDistance = Math.min(distance(shootingCirc, mousePos), shootingCirc.r);
  var x = shootingCirc.x + -aimDistance * Math.sin(aimAng);
  var y = shootingCirc.y + -aimDistance * Math.cos(aimAng);
  return { x: x, y: y };
};