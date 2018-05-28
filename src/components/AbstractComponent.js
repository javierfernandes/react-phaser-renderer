import { invoker } from 'ramda'

const EMPTY_ARRAY = Object.freeze([])
/**
 * base class for components.
 * Avoids duplicating code
 * Sets an abstraction of the lifecyle of a component
 */
export default class AbstractComponent {

  constructor() {
    this.children = []
  }

  // react lifecycle

  init() {}
  appendChild(child) { this.children.push(child) }
  // TODO
  removeChild() {}
  setParent() { }

  prepareUpdate(/* oldProps, newProps */) { return EMPTY_ARRAY }

  // TODO: rename to commit
  updateProperties(updates) {
    return true // what does it means ?
  }

  // phaser components impl

  _callOnChildren = (methodName) => (...args) => 
    this.children.forEach(invoker(args.length, methodName)(...args))

}