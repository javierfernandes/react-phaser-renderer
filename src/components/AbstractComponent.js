import { invoker } from 'ramda'

/**
 * base class for components.
 * Avoids duplicating code
 * Sets an abstraction of the lifecyle of a component
 */
export default class AbstractComponent {

  constructor() {
    this.children = []
  }

  init() {}
  appendChild(child) { this.children.push(child) }
  setParent() { }

  // phaser components impl

  _callOnChildren = (methodName) => (...args) => 
    this.children.forEach(invoker(args.length, methodName)(...args))

}