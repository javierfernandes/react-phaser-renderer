import fs from 'fs'
import Phaser, { Game, Scene } from 'phaser'
import Image from './Image'
import mock from 'xhr-mock'

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

  it('should update a property on the phaser object (ie x)', async () => {
    mockImage('myIcon')
    const image = new Image({ name: 'myIcon', x: 100, y: 100 }, {})
    await mount(image)

    image.updateProperties({}, { x: 200 })
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

const mockImage = name => {
  mock.get(`assets/${name}.png`, (req, res) => {
    const bitmap = fs.readFileSync(`${__dirname}/../../__test__/assets/${name}.png`, 'base64')
    const string = `data:image/png;base64,${bitmap}`
    res.header('Content-type', 'image/png')      
    return res.status(200).body(string)
  })
}