import React from 'react'
import fs from 'fs'
import Renderer from './render'
import render from './test-utils/render'

describe('Renderer', () => {

  it('should export a render object', () => {
    expect(Renderer.render).toBeTruthy()
  })

  it('should mount a simple empty game', async () => {
    // expect().toEqual({
    //   root: <div />
    // })
    expect(render(<game />))
  })

  it.skip('save canvas to file', () => {
    var canvas = new global.Canvas(200, 200, "png")
    var g = canvas.getContext("2d")
    g.fillStyle = "red"
    g.fillRect(0, 0, 100, 100)

    fs.writeFileSync("test.png", canvas.toBuffer())
  })
  
})