/**
 * Module for exploring the Mat class in OpenCV
 * Docs  - https://docs.opencv.org/4.x/d6/d6d/tutorial_mat_the_basic_image_container.html
 */

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import sharp from 'sharp'
import { promisify } from 'util'
import cv from '@techstark/opencv-js'
import { Canvas, createCanvas, Image, ImageData, loadImage } from 'canvas'
import { JSDOM } from 'jsdom'
import { sleep } from './utils/utils.js'
import { getCurrentDirectory } from './utils/module-library.js'
import { installDOM } from './utils/install-dom.js'

// Get the directory containing the script file
const currentDir = getCurrentDirectory(import.meta.url)

const imagePath = join(currentDir, 'images', 'church.png')

/**
 * Demonstrates different ways to copy Mat objects in openCV
 */
async function copying () {
  //https://stackoverflow.com/questions/56671436/cv-mat-is-not-a-constructor-opencv
  try {
    const image = await loadImage(imagePath)
    const imageMatA = cv.imread(image)

    // The following only creates a new header for each Mat object. The matrix points to the same address as imageMatA
    const imageMatB = imageMatA
    const imageMatC = new cv.Mat(imageMatA)

    console.log(
      '--------------------------------Objects sharing Matrix------------------------------------\n\n'
    )

    console.log({
      imageMatARows: imageMatA.rows,
      imageMatBRows: imageMatB.rows,
      imageMatCRows: imageMatC.rows
    })

    imageMatA.delete() // This will impact imageMatA, imageMatB, and imageMatC

    try {
      // Trying to perform an action on any of these will result in an error
      // because they all share the same matrix data which was deleted above (imageMatA.delete()).
      // Uncomment to see results
      // console.log(imageMatA.rows)
      // console.log(imageMatB.rows)
      // console.log(imageMatC.rows)
    } catch (error) {
      console.log('Cannot operate on deleted resource. ', error)
    }

    console.log(
      '\n\n-------------------------------Objects not sharing matrix-------------------------------------\n\n'
    )
    /**
     * The following shows how to copy the matrix itself when copying from one Mat object to a next.
     */

    const imageMatD = cv.imread(image)
    const imageMatE = imageMatD.clone()
    let imageMatF = new cv.Mat()
    imageMatD.copyTo(imageMatF)
    console.log({
      imageMatDRows: imageMatD.rows,
      imageMatERows: imageMatE.rows,
      imageMatFRows: imageMatF.rows
    })

    // This has no impact on imageMatE and imageMatF because they have their own copy of the matrix
    imageMatD.delete()

    console.log('imageMatE and imageMatF after imageMatD was deleted')
    console.log({
      imageMatERows: imageMatE.rows,
      imageMatFRows: imageMatF.rows
    })
  } catch (error) {
    console.error('Error in opencv-js:', error)
  }
}
// before loading opencv.js we emulate a minimal HTML DOM.
installDOM()

// Wait a little to ensure opencv was properly initialized and ready to use
await sleep()

await copying()
