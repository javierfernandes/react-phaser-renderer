import React from 'react'
import fs from 'fs'
import Renderer from './render'
import render from './test-utils/render'
import mock from 'xhr-mock'
import mockImage from './test-utils/mockImage'

describe('Renderer', () => {

  beforeEach(() => mock.setup())
  afterEach(() => mock.teardown())

  it('should export a render object', () => {
    expect(Renderer.render).toBeTruthy()
  })

  it('should mount a simple empty <game />', async () => {
    expect(render(<game />))
  })

  it('should mount a <game> with a <sprite>', async () => {
    mockImage('myIcon')
    expect(render(
      <game>
        <sprite x={100} y={100} name="miIcon" /> 
      </game>
    ))
  })

  it.only('should mount a game with an <image>', async () => {
    mockImage('myIcon')
    expect(render(
      <game>
        <image x={100} y={100} name="miIcon" /> 
      </game>
    ))
  })

  it.skip('save canvas to file', () => {
    var canvas = new global.Canvas(200, 200, "png")
    var g = canvas.getContext("2d")
    g.fillStyle = "red"
    g.fillRect(0, 0, 100, 100)

    fs.writeFileSync("test.png", canvas.toBuffer())
  })
  
})