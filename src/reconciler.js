import Reconciler from 'react-reconciler'
import emptyObject from 'fbjs/lib/emptyObject'
import { identity, always, T, F } from 'ramda'
// import logging from './utils/logger'

import createElement from './utils/createElement'

const NOOP = () => {}

// const log = logging
const log = identity

export default Reconciler(log({
  supportsMutation: true,
  isPrimaryRenderer: true,
  
  createInstance: createElement,

  // (text, rootContainerInstance, internalInstanceHandle) => text
  createTextInstance: identity,

  finalizeInitialChildren: (element, type, props) => {
    element.init(props)
    return false
  },

  getPublicInstance: identity,
  prepareForCommit: NOOP,
  prepareUpdate: (element, type, oldProps, newProps) => 
    element.prepareUpdate(oldProps, newProps),

  resetAfterCommit: NOOP,
  resetTextContent: NOOP,

  getRootHostContext: always(emptyObject),
  getChildHostContext: always(emptyObject),

  shouldSetTextContent: F,

  now: ::performance.now,

  // childs management

  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child)
      child.setParent(parentInstance)
    } else {
      parentInstance.document = child
    }
  },

  appendChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child)
      child.setParent(parentInstance)
    } else {
      parentInstance.document = child
    }
  },

  appendChildToContainer(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child)
      child.setParent(parentInstance)
    } else {
      parentInstance.document = child
    }
  },

  removeChild(parentInstance, child) { parentInstance.removeChild(child) },

  removeChildFromContainer(parentInstance, child) { parentInstance.removeChild(child) },

  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.children = newText
  },

  insertBefore: NOOP,

  commitUpdate: (instance, updatePayload) => {
    instance.commitUpdate(updatePayload)
  },

  commitMount: NOOP,

}, 'Reconciler'))