import { Sprite as PSprite } from 'phaser'

export default class Sprite {
  constructor(props, root) {
    const { x = 0, y = 0, key, frame } = props 
    this.sprite = new PSprite(root.game, x, y, key, frame)
  }
}