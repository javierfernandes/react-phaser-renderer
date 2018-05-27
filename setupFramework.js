
// polyfill/mock blob creation (not supported by jsdom
// https://github.com/jsdom/jsdom/issues/1721)
function noOp() {}
if (!global.window.URL.createObjectURL) {
  Object.defineProperty(global.window.URL, 'createObjectURL', { value: noOp })
  Object.defineProperty(global.window.URL, 'revokeObjectURL', { value: noOp })
}

