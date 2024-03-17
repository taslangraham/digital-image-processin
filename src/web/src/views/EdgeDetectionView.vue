<template>
  <div class="grid grid-cols-12">
    <h1 class="col-span-12 mt-6 text-lg text-center">Canny Edge Detection</h1>

    <label for="" class="col-span-12 mt-6 mb-10">
      Upload an Image
      <input type="file" @change="onImageUpload" accept="image/png, image/gif, image/jpeg" />
    </label>
    <div class="col-span-12 mt-2 mb-4">
      <div class="grid grid-cols-12">
        <span class="col-span-12 font-bold">Paramters</span>

        <label for="" class="col-span-12 mt-6">
          Hysteresis Min Threshold
          <input
            type="range"
            @change="detectEdge"
            v-model="thresholdMin"
            max="100"
            step="0.5"
            min="5"
          />
          ({{ thresholdMin }})
        </label>

        <label for="" class="col-span-12 mt-2">
          Hysteresis Max Threshold
          <input
            type="range"
            @change="detectEdge"
            v-model="thresholdMax"
            max="200"
            step="0.5"
            min="100"
          />
          ({{ thresholdMax }})
        </label>
      </div>
    </div>
    <div class="col-span-12 grid grid-cols-12 gap-4">
      <div class="col-span-6">
        <span class="col-span-6 mb-1 font-bold">INPUT</span>
        <canvas id="input-canvas" class="w-full border border-blue-400 max-h-96" height="600" />
      </div>
      <div class="col-span-6">
        <span class="col-span-6 mb-1 font-bold">OUTPUT</span>
        <canvas id="output-canvas" class="w-full border border-blue-400 max-h-96" height="600" />
      </div>
    </div>

    <div class="col-span-12 text-lg font-bold mt-10">Further Readings</div>

    <ul class="list-decimal">
      <li>
        <a href="https://docs.opencv.org/4.x/da/d22/tutorial_py_canny.html"
          >https://docs.opencv.org/4.x/da/d22/tutorial_py_canny.html</a
        >
      </li>
      <li>
        <a href="https://en.wikipedia.org/wiki/Edge_detection"
          >https://en.wikipedia.org/wiki/Edge_detection</a
        >
      </li>
      <li>
        <a href="https://www.mygreatlearning.com/blog/introduction-to-edge-detection/"
          >https://www.mygreatlearning.com/blog/introduction-to-edge-detection/</a
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import cv from '@techstark/opencv-js'
import { ref } from 'vue'

let thresholdMin = ref('100')
let thresholdMax = ref('200')
const image = ref<HTMLImageElement>()

function onImageUpload(e: Event) {
  const input = e.target as HTMLInputElement
  if (input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader()

      reader.onload = function (e) {
        image.value = new Image()
        image.value.src = e.target!.result as string

        image.value.onload = function () {
          cv.imshow('input-canvas', cv.imread(image.value as HTMLImageElement))
          detectEdge()
        }
      }

      reader.readAsDataURL(input.files[0])
    }
  }
}

function detectEdge() {
  const sourceImage = cv.imread('input-canvas')
  if (!image.value) {
    return
  }

  const grayImage = new cv.Mat()
  cv.cvtColor(sourceImage, grayImage, cv.COLOR_BGR2GRAY)
  const blurredImage = new cv.Mat()
  cv.GaussianBlur(grayImage, blurredImage, new cv.Size(5, 5), 0)

  const edges = new cv.Mat()

  cv.Canny(
    blurredImage,
    edges,
    parseInt(thresholdMin.value),
    parseInt(thresholdMax.value)
    // 5,
    // false
  )
  cv.imshow('output-canvas', edges)

  sourceImage.delete()
  grayImage.delete()
  blurredImage.delete()
  edges.delete()
}
</script>
