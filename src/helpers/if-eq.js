module.exports = function (a, b, block) {
  if (a === b) {
    return block.fn(this);
  }
  return '';
};
