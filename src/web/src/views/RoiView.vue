<template>
  <div>
    <p>Region Of Interest allows you to narrow in and work with specific areas of an image</p>
    <a href="https://docs.opencv.org/4.x/de/d06/tutorial_js_basic_ops.html"
      >https://docs.opencv.org/4.x/de/d06/tutorial_js_basic_ops.html</a
    >
    <h2>Input image</h2>
    <br />
    <BaseCanvas />
    <br />
    <h2>Output Image</h2>
    <br />

    <span>Change Parameters to See effect</span>
    <br />

    X: <input type="range" name="" id="" v-model="x" :max="srcImageWidth" @input="handleRoi" /> ({{
      x
    }})<br />
    Y: <input type="range" name="" id="" v-model="y" :max="srcImageHeight" @input="handleRoi" /> ({{
      y
    }})<br />

    Width:
    <input type="range" name="" id="" v-model="width" :max="srcImageWidth" @input="handleRoi" /> ({{
      width
    }})
    <br />
    Height:
    <input type="range" name="" id="" v-model="height" :max="srcImageHeight" @input="handleRoi" />
    ({{ height }})
    <br />

    <canvas id="output-canvas" height="400" width="400"></canvas>
  </div>
</template>

<script setup lang="ts">
import * as cv from '@techstark/opencv-js'
import { onMounted, ref } from 'vue'
import BaseCanvas from '@/components/BaseCanvas.vue'

const x = ref('10')
const y = ref('100')
const width = ref('100')
const height = ref('100')
const srcImageHeight = ref(100)
const srcImageWidth = ref(100)

function handleRoi() {
  try {
    let src = cv.imread('input-canvas')

    // Destination matrix
    let dst = new cv.Mat()

    // Create rectangle used mark region

    let rect = new cv.Rect(
      parseInt(x.value),
      parseInt(y.value),
      parseInt(width.value),
      parseFloat(height.value)
    )

    dst = src.roi(rect)
    cv.imshow('output-canvas', dst)
    src.delete()
    dst.delete()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  setTimeout(function () {
    const h = cv.imread('input-canvas')
    srcImageHeight.value = h.rows
    srcImageWidth.value = h.cols
    // width.value = srcImageWidth.value.toString()
    // height.value = srcImageHeight.value.toString()
    handleRoi()
  }, 1000)
})
</script>
