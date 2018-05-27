import createElement, { factoryByType } from './createElement'

describe('createElement', () => {
  
  it('factoryByType is constructed inferring functions from components', () => {
    expect(factoryByType).toEqual({
      game: expect.any(Function),
      root: expect.any(Function),
      sprite: expect.any(Function),
      image: expect.any(Function)
    })
  })

  it('should throw an error for unknown type', () => {
    expect(() => { createElement('blah') }).toThrow(new Error('Unknown tag type: blah'))
  })

})