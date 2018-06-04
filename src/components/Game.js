import Phaser, { Game as PGame } from 'phaser'
import AbstractComponent from './AbstractComponent'

export default class Game extends AbstractComponent {

  constructor(props, root) {
    super()
    this.root = root
    this.parentDOM = root.root
  
    // TODO: remove hardcoded default values
    const { width = 640, height = 360 } = props

    this.phaserObject = new PGame({
      type: Phaser.AUTO,
      width,
      height
    })
  }

}