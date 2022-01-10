module.exports = function (name, block) {
  return block.fn({src: require(`images/${name}`).view});
};
