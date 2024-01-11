/**
 * This module demonstrates how to rotate an image.
 * It shows how to do it with sharp.js as well as opencv
 */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { promisify } from 'util';
import cv from '@techstark/opencv-js';
import { Canvas, createCanvas, Image, ImageData, loadImage } from 'canvas';
import { JSDOM } from 'jsdom';
import { sleep } from './utils/utils.js';
import { getCurrentDirectory } from './utils/module-library.js';

const unlinkAsync = promisify(fs.unlink);
// Get the directory containing the script file
const currentDir = getCurrentDirectory(import.meta.url);

const imagePath = join(currentDir, 'images', 'church.png');


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


async function rotateWithSharpJs() {
	try {
		// Rotate and resize the image using sharp.js
		const rotatedImageBuffer = await sharp(imagePath)
			.rotate(25, {
				background: null
			})
			.resize(2000)
			.jpeg({ mozjpeg: true })
			.toBuffer();

		const filePath = join(currentDir, 'outputs', 'sharp_js_rotated_image.jpeg');
		fs.writeFileSync(filePath, rotatedImageBuffer);

		console.log('Image rotated using sharp.js. Location: ' + filePath);
	} catch (error) {

	}
}

async function rotateWithOpenCv() {
	// before loading opencv.js we emulate a minimal HTML DOM. See the function declaration below.
	installDOM();
	// Wait a little to ensure opencv was properly initialized and ready to use
	await sleep();
	//https://stackoverflow.com/questions/56671436/cv-mat-is-not-a-constructor-opencv
	try {
		const image = await loadImage(imagePath);
		const src = cv.imread(image);
		const destinationMatrix = new cv.Mat();

		// Create a canvas with the dimensions of the rotated image
		const canvas = createCanvas(300, 300);

		// Perform a 90-degree clockwise rotation using cv.rotate
		// Have to use a different approach to do no-90 degree rotations
		cv.rotate(src, destinationMatrix, cv.ROTATE_90_COUNTERCLOCKWISE);

		// Display the rotated image on the canvas
		// this don't visually show anything. it bascially loads the image onto the simulated canvas
		cv.imshow(canvas, destinationMatrix);

		const filePath = join(currentDir, 'outputs', 'opencv_rotated_90.jpeg');
		fs.writeFileSync(filePath, canvas.toBuffer('image/jpeg'));

		src.delete();
		destinationMatrix.delete();

		console.log('Image rotated 90 degrees COUNTERCLOCKWISE using opencv-js. Location: ' + filePath);
	} catch (error) {
		console.error('Error in opencv-js:', error);
	}

}


rotateWithOpenCv()
rotateWithSharpJs();

