export const distance = (p1, p2) => {
  return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
};

export const angle = (p1, p2) => {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};