const Canvas = require('canvas')
const jsdom = require('jsdom')

const { JSDOM } = jsdom
const { document } = (new JSDOM('')).window

const window = document.parentWindow

global.Canvas = Canvas
global.Image = Canvas.Image

// expose a few things to all the modules
global.document = document
global.window = window

global.window.CanvasRenderingContext2D = 'foo' // let Phaser think that we have a canvas
global.window.Element = undefined
global.navigator = {userAgent: 'Custom' } // could be anything

// fake the xml http request object because Phaser.Loader uses it
// global.XMLHttpRequest = () => {}

