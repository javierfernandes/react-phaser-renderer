import Reconciler from 'react-reconciler'
import emptyObject from 'fbjs/lib/emptyObject'
import { identity, always, F } from 'ramda'
import logging from './utils/logger'

import createElement from './utils/createElement'

const NOOP = () => {}

const log = logging
// const log = identity

export default Reconciler(log({
  
  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child)
      child.setParent(parentInstance)
    } else {
      parentInstance.document = child
    }
  },

  createInstance: createElement,

  // (text, rootContainerInstance, internalInstanceHandle) => text
  createTextInstance: identity,

  finalizeInitialChildren: (element, type, props) => {
    element.init(props)
    return false
  },

  getPublicInstance: identity,
  prepareForCommit: NOOP,
  // (element, type, oldProps, newProps) => Boolean,
  prepareUpdate: (element, type, oldProps, newProps) => {
    return element.updateProperties(oldProps, newProps)
  },
  resetAfterCommit: NOOP,
  resetTextContent: NOOP,
  // You can use this 'rootInstance' to pass data from the roots.
  getRootHostContext: NOOP,

  getChildHostContext: always(emptyObject),

  // (type, props) => Boolean
  shouldSetTextContent: F,

  now: ::performance.now,

  mutation: {
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

    removeChild(parentInstance, child) {
      parentInstance.removeChild(child)
    },

    removeChildFromContainer(parentInstance, child) {
      parentInstance.removeChild(child)
    },

    commitTextUpdate(textInstance, oldText, newText) {
      textInstance.children = newText
    },

    // (parentInstance, child, beforeChild) => 
    insertBefore: NOOP,

    // (instance, updatePayload, type, oldProps, newProps) => 
    commitUpdate: NOOP,

    // (instance, updatePayload, type, oldProps, newProps) => 
    commitMount: NOOP,

  }

}))