import AbstractComponent from './AbstractComponent'

export default class Image extends AbstractComponent {

  constructor(props) {
    super()
    // probably not needed
    this.props = props
  }

  onPreload(game) {
    const { name } = this.props
    game.load.image(name, `assets/${name}.png`)
  }

  onCreate(scene) {
    const { x = 0, y = 0, name, onClick, ...others } = this.props
    this.phaserObject = scene.add.image(x, y, name)
    
    if (onClick) {
      console.log('Settting onClick handler on image object')
      this.phaserObject.setInteractive()
      this.phaserObject.on('pointerdown', () => {
        console.log('GOT POINTERDOWN EVENT !')
        onClick()
      })
    }

    // forward non-constructor-args props
    this._forwardProperties(others)
  }
  
  _forwardProperties(props) {
    Object.entries(props).forEach(([key, value]) => {
      this.phaserObject[key] = value
    })
  }

  // react update

  updateProperties(oldProps, newProps) {
    if (!this.phaserObject) {
      console.error('phaser object still not created!!')
      return
    }

    // TODO: handle nullated props !

    Object.entries(newProps)
      .forEach(([key, value]) => {
        if (value !== oldProps[key]) {
          this.phaserObject[key] = value
        }
      })
    return super.updateProperties(oldProps, newProps)
  }
  
}
