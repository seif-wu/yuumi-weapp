function fadeIn(selector, duration = 1500) {
  this.animate(selector, [
    { opacity: 0 },
    { opacity: 1 },
  ], duration)
}

function fadeInLeft(selector, duration = 1500) {
  this.animate(selector, [
    { opacity: 0, translate3d: ['-100%', 0, 0] },
    { opacity: 1, translate3d: [0, 0, 0] },
  ], duration)
}

export default {
  default: fadeIn,
  left: fadeInLeft,
};
