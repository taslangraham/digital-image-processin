<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
<div>
  <div class="grid grid-col-s1">
    <h1 class="font-extrabold text-2xl text-center">Open CV Web App</h1>
  </div>
  <RouterView />
</div>
</template>

<style scoped>
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }



  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }


}
</style>
