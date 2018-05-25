import Reconciler from 'react-reconciler'
import emptyObject from 'fbjs/lib/emptyObject'
import { identity, mapObjIndexed } from 'ramda'
import stringify from 'json-stringify-safe'

import createElement from './utils/createElement'

const NOOP = () => {}

const wrapMethod = (m, name) => (...args) => {
  try {
    console.log(`Calling ${name}(${stringify(args)})`)
  } catch (e) {
    console.log(`Calling ${name}(<< CANNOT SHOW PARAMS :(  FAILED TO STRINGIFY))`)
  }
  return m(...args)
}
const log = mapObjIndexed(wrapMethod)

export default Reconciler(log({
  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child)
    } else {
      parentInstance.document = child
    }
  },

  createInstance: createElement,

  createTextInstance: (text, rootContainerInstance, internalInstanceHandle) => text,

  finalizeInitialChildren: (wordElement, type, props) => false,

  getPublicInstance: identity,

  prepareForCommit: NOOP,

  prepareUpdate: (wordElement, type, oldProps, newProps) => true,

  resetAfterCommit: NOOP,
  resetTextContent(wordElement) { },

  // You can use this 'rootInstance' to pass data from the roots.
  getRootHostContext(rootInstance) { },

  getChildHostContext: () => emptyObject,

  shouldSetTextContent: (type, props) => false,

  now: ::performance.now,

  mutation: {
    appendChild(parentInstance, child) {
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child)
      } else {
        parentInstance.document = child
      }
    },

    appendChildToContainer(parentInstance, child) {
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child)
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

    insertBefore: (parentInstance, child, beforeChild) => { },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) { },

    commitMount(instance, updatePayload, type, oldProps, newProps) { },

    commitTextUpdate(textInstance, oldText, newText) {
      textInstance.children = newText
    }

  }

}))