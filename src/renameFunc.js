const getOwn = Object.getOwnPropertyDescriptor;

function renameFunc(func, name) {
  if (!getOwn) {
    return
  }

  const desc = getOwn(func, 'name');

  if (desc && desc.configurable) {
    Object.defineProperty(func, 'name', {
      ...desc,
      value: name,
    });
  }
}

module.exports = renameFunc;
