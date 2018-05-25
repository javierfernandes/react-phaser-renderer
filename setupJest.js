const Canvas = require('canvas')
const jsdom = require('jsdom')

const { JSDOM } = jsdom
const { document } = (new JSDOM('')).window

const window = document.parentWindow

// expose a few things to all the modules
global.document = document;
global.window = window;
global.Canvas = Canvas;
global.Image = Canvas.Image;
global.window.CanvasRenderingContext2D = 'foo'; // let Phaser think that we have a canvas
global.window.Element = undefined;
global.navigator = {userAgent: 'Custom'}; // could be anything

// fake the xml http request object because Phaser.Loader uses it
global.XMLHttpRequest = function() {};

// load an expose PIXI in order to finally load Phaser
// global.PIXI = require('Phaser/build/custom/pixi');
// global.Phaser = Phaser = require('Phaser/build/custom/phaser-arcade-physics');

// module.exports = Phaser;