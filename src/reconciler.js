import Reconciler from 'react-reconciler'
import emptyObject from 'fbjs/lib/emptyObject'
import { identity, always } from 'ramda'
// import logging from './utils/logger'

import createElement from './utils/createElement'

const NOOP = () => {}

// const log = logging
const log = identity

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

  createTextInstance: (text, rootContainerInstance, internalInstanceHandle) => text,

  finalizeInitialChildren: (element, type, props) => {
    element.init(props)
    return false
  },

  getPublicInstance: identity,

  prepareForCommit: NOOP,

  prepareUpdate: (element, type, oldProps, newProps) => true,

  resetAfterCommit: NOOP,
  resetTextContent(element) { },

  // You can use this 'rootInstance' to pass data from the roots.
  getRootHostContext(rootInstance) { },

  getChildHostContext: always(emptyObject),

  shouldSetTextContent: (type, props) => false,

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

    insertBefore: (parentInstance, child, beforeChild) => {
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    },

    commitMount(instance, updatePayload, type, oldProps, newProps) {
    },

    commitTextUpdate(textInstance, oldText, newText) {
      textInstance.children = newText
    }

  }

}))