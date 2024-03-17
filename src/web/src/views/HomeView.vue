<script setup lang="ts"></script>

<template>
  <main class="grid">
    <div class="mt-6 font-medium text-lg">Click A Link Below To See OpenCV In Action</div>
    <ul class="list-decimal underline text-blue-800">
      <li>
        <RouterLink to="/getting-started-with-images">
          Getting Started With Images: Learn how to read an image and how to display it in a web.
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/roi"> Region Of Interest(ROI) </RouterLink>
      </li>
      <li>
        <RouterLink to="/edge-detection"> Edge Detection </RouterLink>
      </li>
    </ul>
  </main>
</template>
