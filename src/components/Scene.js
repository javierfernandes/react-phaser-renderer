import { Scene as PScene } from 'phaser'
import AbstractComponent from './AbstractComponent'

export default class Scene extends AbstractComponent {
  
  constructor(props, root) {
    super(props, root)
    this.props = props
  }

  setParent(game) {
    super.setParent(game)

    const { name, autoStart } = this.props

    const gameScene = new PScene()
    gameScene.preload = () => this.onPreload(gameScene)
    gameScene.create = () => this.onCreate(gameScene)
    // gameScene.update = () => this.onUpdate(gameScene)
    this.phaserObject = gameScene

    game.phaserObject.scene.add(name, gameScene, autoStart)
    console.log('>>>> Creating Scene', name, '=', this.phaserObject)
  }

  onPreload = this._callOnChildren('onPreload')
  onCreate = this._callOnChildren('onCreate')
  onUpdate = this._callOnChildren('onUpdate')
}

