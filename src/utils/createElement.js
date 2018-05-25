import Types from '../types'
import { Root, Game, Sprite } from '../components/index'

const createElement = (type, props, root) => factory(type)(props, root)
const factory = type => factoryByType[type] || factoryByType.default

const factoryByType = {
  [Types.ROOT]: (props, root) => new Root(props, root),
  // TODO: use ramda to avoid the arrow
  [Types.GAME]: (props, root) => new Game(props, root),
  [Types.SPRITE]: (props, root) => new Sprite(props, root),
  default: () => undefined,
}

export default createElement