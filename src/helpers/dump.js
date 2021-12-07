module.exports = function (object) {
  return `<pre>${JSON.stringify(object, null, 2)}</pre>`;
};
