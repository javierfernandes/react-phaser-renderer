import Renderer from '../render'

export default element => {
  const div = document.createElement('div')
  return Renderer.render(element, div)
}