import createElement from './utils/createElement'
import Reconciler from './reconciler'
import Types from './types'

const render = (element, context) => {
  const container = createElement(Types.ROOT, null, context)
  const node = Reconciler.createContainer(container)
  Reconciler.updateContainer(element, node, null)
  return container
}

export default {
  render
}