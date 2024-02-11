<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import WelcomeItem from '../components/WelcomeItem.vue'

</script>

<template>
  <main>
    Click On an Item Below to See OpenCV In Action

      <RouterLink to="/getting-started-with-images">
        <WelcomeItem>

          Getting Started With Images
          Learn how to read an image and how to display it in a web.
        </WelcomeItem>
      </RouterLink>

  </main>
</template>
