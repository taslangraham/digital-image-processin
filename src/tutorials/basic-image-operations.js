/**
 * Basic image operations in OpenCV
 * https://docs.opencv.org/3.4/de/d06/tutorial_js_basic_ops.html
 */

import { installDOM } from "../utils/install-dom.js";
import { getCurrentDirectory } from "../utils/module-library.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Canvas, createCanvas, Image, ImageData, loadImage } from 'canvas';
import { sleep } from "../utils/utils.js";
import cv from '@techstark/opencv-js';

// Get the directory containing the script file
const currentDir = getCurrentDirectory(import.meta.url);

const imagePath = join(currentDir, '../../src/images', 'church.png');

const image = await loadImage(imagePath);

async function accessImageProperties() {
	const src = cv.imread(image);

	console.log('image width: ' + src.cols + '\n' +
		'image height: ' + src.rows + '\n' +
		'image size: ' + src.size().width + '*' + src.size().height + '\n' +
		'image depth: ' + src.depth() + '\n' +
		'image channels ' + src.channels() + '\n' +
		'image type: ' + src.type() + '\n');
}


installDOM();
// Wait a little to ensure opencv was properly initialized and ready to use
await sleep();

try {
	console.log('----------------------------accessImageProperties()--------------\n\n');
	await accessImageProperties();
} catch (error) {
	console.log(error)
}