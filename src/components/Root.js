
export default class Root {

  constructor(props, root) {
    // the dom element
    this.root = root
  }

  appendChild(child) {
    console.log('>>>> [Root] setting child to root', child)
    // hacked I guess
    this.game = child
  }
  setParent(parent) { }

  setGame(game) {
    this.game = game
    console.log('Set game', this)
  }

}