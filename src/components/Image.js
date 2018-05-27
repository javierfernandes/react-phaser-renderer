import AbstractComponent from './AbstractComponent'

export default class Image extends AbstractComponent {

  constructor(props, root) {
    super()
    // probably not needed
    this.root = root
    this.props = props
  }

  onPreload(game) {
    const { name } = this.props
    game.load.image(name, `assets/${name}.png`)
  }

  onCreate(scene) {
    const { x = 0, y = 0, name, ...others } = this.props
    this.phaserObject = scene.add.image(x, y, name)
    
    // forward non-constructor-args props
    Object.entries(others).forEach(([key, value]) => {
      this.phaserObject[key] = value
    })
  }
  
}
