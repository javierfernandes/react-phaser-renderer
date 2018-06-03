import colors from 'colors'
import Reconciler from 'react-reconciler'

const sideEffect = (method, text) => console.log(colors[method](text));

const ConsoleRenderer = Reconciler({
  now: ::performance.now,

  getRootHostContext() {
    return {};
  },

  getChildHostContext() {
    return {};
  },

  getPublicInstance(instance) {
    return null;
  },

  createInstance(type, props) {
    return {};
  },

  appendInitialChild(parentInstance, child) {},

  finalizeInitialChildren(host, type, props) {
    if (typeof props.children === 'string') {
      sideEffect(type, props.children)
    }
    return false
  },

  prepareUpdate(instance, type, oldProps, newProps) {
    return {}
  },

  commitMount(instance, type, newProps) {},

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    if (typeof newProps.children === 'string') {
      if (newProps.children !== oldProps.children) {
        sideEffect(type, newProps.children)
      }
    }
  },

  shouldSetTextContent(type, props) {},

  resetTextContent(instance) {},

  shouldDeprioritizeSubtree(type, props) {},

  createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {},

  commitTextUpdate(textInstance, oldText, newText) {},

  appendChild(parentInstance, child) {},
  appendChildToContainer(parentInstance, child) {},

  insertBefore(parentInstance, child, beforeChild) {},
  insertInContainerBefore(container, child, beforeChild) {},

  removeChild(parentInstance, child) {},
  removeChildFromContainer(container, child) {},

  prepareForCommit() {},

  resetAfterCommit() {},

  scheduleAnimationCallback: window.requestAnimationFrame,
  scheduleDeferredCallback: window.requestIdleCallback,

})

let root;
const ReactConsole = {
  render(element, callback) {
    if (!root) {
      const container = {}
      root = ConsoleRenderer.createContainer(container)
    }
    ConsoleRenderer.updateContainer(element, root, null, callback)
  },
}

module.exports = ReactConsole