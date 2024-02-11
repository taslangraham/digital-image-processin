<template>
  <div id="getting-started-images">
    <section>
      <h5>Initial Image</h5>
      <canvas id="initial-canvas" height="600" width="600"></canvas>
    </section>

    <section style="margin-top: 3rem">
			<h3>Image Displayed By OpenCV</h3>
      Change Color Space<br />
      <select
        name=""
        id=""
        v-model="selectedColorSpace"
        @change="readImageFromCanvasAndDisplayItUsingOpenCV()"
      >
        <option value="GRAY" selected>GRAY</option>
        <option value="LAB">LAB</option>
        <option value="HLS_FULL">HLS_FULL</option>
        <option value="Luv">Luv</option>
        <option value="XYZ">XYZ</option>
      </select>
      <br /><br />


      <canvas id="opencv-canvas" height="600" width="600"></canvas>
    </section>
  </div>
</template>

<script setup lang="ts">
import * as cv from '@techstark/opencv-js'
import { onMounted, ref } from 'vue'

let selectedColorSpace = ref('GRAY')

function setup() {
  const canvas = document.getElementById('initial-canvas') as HTMLCanvasElement
  let ctx = canvas.getContext('2d')
  const img = new Image()

  img.src = 'nelli.jpg'
  img.onload = () => {
    ctx!.drawImage(img, 0, 0, canvas.width, canvas.height)
    readImageFromCanvasAndDisplayItUsingOpenCV()
  }
}

/**
 * Read an image from HTML Canvas using OpenCv.
 * Note: `cv.imread(imageSource)` is an easier way to read in a image instead of this function
 */
function readImageWithOpenCv() {
  // /First, create an ImageData obj from canvas:
  let canvas = document.getElementById('initial-canvas') as HTMLCanvasElement
  let ctx = canvas!.getContext('2d')
  let imgData = ctx!.getImageData(0, 0, canvas.width, canvas.height)

  // Then, use cv.matFromImageData to construct a cv.Mat:
  let src = cv.matFromImageData(imgData)

  return src
}

function simplifiedReadImage(canvasOrImageHtmlElement: string | HTMLElement) {
  return cv.imread(canvasOrImageHtmlElement)
}

function getColorSpace() {
  let colorSpace
  const color = selectedColorSpace.value

  switch (color) {
    case 'GRAY':
      colorSpace = cv.COLOR_RGBA2GRAY
      break
    case 'LAB':
      colorSpace = cv.COLOR_RGB2Lab
      break
    case 'HLS_FULL':
      colorSpace = cv.COLOR_RGB2HLS_FULL
      break
    case 'Luv':
      colorSpace = cv.COLOR_RGB2Luv
      break
    case 'XYZ':
      colorSpace = cv.COLOR_RGB2XYZ
      break
    default:
      colorSpace = cv.COLOR_RGBA2GRAY
  }

  return colorSpace
}

function readImageFromCanvasAndDisplayItUsingOpenCV() {
  const imageFromCanvas = simplifiedReadImage('initial-canvas')
  let destinationMatrix = new cv.Mat()

  cv.cvtColor(imageFromCanvas, destinationMatrix, getColorSpace())
  cv.imshow('opencv-canvas', destinationMatrix)

  // Cleanup
  imageFromCanvas.delete()
  destinationMatrix.delete()
}

onMounted(() => setup())
</script>