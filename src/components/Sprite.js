
export default class Sprite {

  constructor(props, root) {
    // probably not needed
    this.root = root
    this.props = props
  }

  onPreload(game) {
    const { name } = this.props

    game.load.image(name, `assets/${name}.png`)
  }

  onCreate(scene) {
    const { x = 0, y = 0, name, frame } = this.props
    scene.add.sprite(x, y, name, frame)
  }

  init() { }
  appendChild() { }
  setParent() { }

  
}
