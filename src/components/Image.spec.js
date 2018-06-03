import Phaser, { Game, Scene } from 'phaser'
import Image from './Image'
import mock from 'xhr-mock'
import mockImage from '../test-utils/mockImage'
import Reconciler from '../reconciler'

describe('Components / Image', () => {

  beforeEach(() => mock.setup())
  afterEach(() => mock.teardown())

  it('should instantiate fine', async () => {
    mockImage('myIcon')
    const image = new Image({ name: 'myIcon', x: 100, y: 80 }, {})
    await mount(image)

    expect(image.phaserObject).toBeTruthy()
    expect(image.phaserObject.x).toEqual(100)
    expect(image.phaserObject.y).toEqual(80)
  })

  it('prepareUpdate() should calculate the diff', async () => {
    mockImage('myIcon')
    const image = new Image({ name: 'myIcon', x: 100, y: 100 }, {})
    await mount(image)

    expect(image.prepareUpdate({ x: 100 }, { x: 200 })).toEqual([
      ['x', 200]
    ])
  })

  it('commitUpdate() should update a property on the phaser object (ie x)', async () => {
    mockImage('myIcon')
    const image = new Image({ name: 'myIcon', x: 100, y: 100 }, {})
    await mount(image)

    image.commitUpdate([['x', 200]])
    expect(image.phaserObject.x).toEqual(200)
  })

})

// utils

const mount = component => new Promise(resolve => {
  const scene = new Scene()
  scene.preload = () => { component.onPreload(scene) }
  scene.create = () => { component.onCreate(scene) ; resolve() }
  new Game({
    type: Phaser.AUTO,
    width: 200,
    height: 200,
    scene
  })
})

