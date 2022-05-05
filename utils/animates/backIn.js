function backInUp(selector, duration = 1500) {
  this.animate(selector, [
    { translateY: 1200, scale: [0.7, 0.7], opacity: 0.7, offset: 0 },
    { translateY: 0, scale: [0.7, 0.7], opacity: 0.7 , offset: 0.8 },
    { scale: [1, 1], opacity: 1, offset: 1},
  ], duration)
}

export default {
  up: backInUp,
};
