const onElementHeightChange = (elm, callback) => {
  const element = elm;
  let lastHeight = element.clientHeight;
  let newHeight;
  (function run() {
    newHeight = element.clientHeight;
    if (lastHeight !== newHeight)
      callback();
    lastHeight = newHeight;
    if (element.onElementHeightChangeTimer)
      clearTimeout(element.onElementHeightChangeTimer);

    element.onElementHeightChangeTimer = setTimeout(run, 200);
  })();
};

module.exports = onElementHeightChange;
