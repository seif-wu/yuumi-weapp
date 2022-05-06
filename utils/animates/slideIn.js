function slideInLeft(selector, duration = 1500) {
  this.animate(selector, [
    { translate3d: ['-100%', 0, 0] },
    { translate3d: [0, 0, 0] },
  ], duration)
}

export default {
  left: slideInLeft,
};
