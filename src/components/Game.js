import Phaser, { Game as PGame, Scene } from 'phaser'

export default class Game {

  constructor(props, root) {
    this.root = root
    this.parentDOM = root.root
    this.children = []
  
    const { width = 640, height = 360 } = props

    // TODO: move to a <scene> component
    this.gameScene = new Scene()
    this.gameScene.preload = () => this.onPreload(this.gameScene)
    this.gameScene.create = () => this.onCreate(this.gameScene)

    this.game = new PGame({
      type: Phaser.AUTO,
      width,
      height,
      scene: this.gameScene
    })
  }

  onPreload(scene) {
    this.children.forEach(c => c.onPreload(scene))
  }
  onCreate(scene) {
    this.children.forEach(c => c.onCreate(scene))
  }
  onUpdate() {
  }

  init() { }

  appendChild(child) {
    this.children.push(child)
  }
  setParent() { }

}