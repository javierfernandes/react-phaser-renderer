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
    
    // TODO: support this in updateProperties
    if (onClick) {
      this.phaserObject.setInteractive()
      this.phaserObject.on('pointerdown', onClick)
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

  prepareUpdate(oldProps, newProps) {
    if (!this.phaserObject) {
      // OMG: ? how can we handle components still not created in phaser ??
      console.error('phaser object still not created!!')
      return true
    }

    // TODO: handle nullated props !
    return Object.entries(newProps)
    .reduce((acc, prop) => {
      const [key, value] = prop 
      if (value !== oldProps[key]) {
        acc.push(prop)
      }
      return acc
    }, [])
  }


  updateProperties(changes) {
    if (!this.phaserObject) {
      console.error('phaser object still not created!!')
      return true
    }
    // TODO: extract EMPTY_ARRAY
    (changes || []).forEach(([key, value]) => {
      this.phaserObject[key] = value
    }) 
    return true
  }
  
}
