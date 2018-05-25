import React from 'react'
import Renderer from './render'
import render from './test-utils/render'

describe('Renderer', () => {

  it('should export a render object', () => {
    expect(Renderer.render).toBeTruthy()
  })

  it('should mount a simple empty game', async () => {
    await render(<game />)
  })
  
})