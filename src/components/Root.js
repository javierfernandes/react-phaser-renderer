import AbstractComponent from './AbstractComponent'

export default class Root extends AbstractComponent {

  constructor(props, root) {
    super()
    // the dom element
    this.root = root
  }

}