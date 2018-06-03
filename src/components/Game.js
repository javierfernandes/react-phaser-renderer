import Phaser, { Game as PGame, Scene } from 'phaser'
import AbstractComponent from './AbstractComponent'

export default class Game extends AbstractComponent {

  constructor(props, root) {
    super()
    this.root = root
    this.parentDOM = root.root
  
    // TODO: remove hardcoded default values
    const { width = 640, height = 360 } = props

    // TODO: move to a <scene> component
    this.gameScene = new Scene()
    this.gameScene.preload = () => this.onPreload(this.gameScene)
    this.gameScene.create = () => this.onCreate(this.gameScene)

    this.phaserObject = new PGame({
      type: Phaser.AUTO,
      width,
      height,
      scene: this.gameScene
    })
  }

  onPreload = this._callOnChildren('onPreload')
  onCreate = this._callOnChildren('onCreate')
  onUpdate = this._callOnChildren('onUpdate')

}