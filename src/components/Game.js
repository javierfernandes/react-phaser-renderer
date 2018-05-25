import Phaser, { Game as PGame } from 'phaser'

export default class Game {

  constructor(props, root) {
    const parentDOM = root.root   
    this.game = new PGame(800, 600, Phaser.AUTO, parentDOM)
  }

}