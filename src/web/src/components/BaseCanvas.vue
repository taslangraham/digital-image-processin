<template>
  <div>
    <canvas id="input-canvas" height="400" width="400"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {
  const canvas = document.getElementById('input-canvas') as HTMLCanvasElement
  let ctx = canvas.getContext('2d')
  const img = new Image()

  img.src = 'nelli.jpg'
  img.onload = () => {
    ctx!.drawImage(img, 0, 0, canvas.width, canvas.height)
  }
})
</script>
