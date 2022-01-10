module.exports = function (name, block) {
  return block.fn({src: require(`icons/${name}`).view});
};
