import { factoryByType } from './createElement'

describe('createElement', () => {
  
  it('factoryByType is constructed inferring functions from components', () => {
    expect(factoryByType).toEqual({
      game: expect.any(Function),
      root: expect.any(Function),
      sprite: expect.any(Function),
      default: expect.any(Function)
    })
  })

})