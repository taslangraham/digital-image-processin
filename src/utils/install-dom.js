import { JSDOM } from 'jsdom';
import { Canvas, createCanvas, Image, ImageData, loadImage } from 'canvas';

// Using jsdom and node-canvas we define some global variables to emulate HTML DOM.
// Only define those globals used by cv.imread() and cv.imshow().
function installDOM() {
	const dom = new JSDOM();
	global.document = dom.window.document;
	// The rest enables DOM image and canvas and is provided by node-canvas
	global.Image = Image;
	global.HTMLCanvasElement = Canvas;
	global.ImageData = ImageData;
	global.HTMLImageElement = Image;
}

export {
	installDOM
}