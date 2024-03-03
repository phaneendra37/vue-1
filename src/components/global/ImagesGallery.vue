<template>
  <!-- Gallery container with dynamic ID -->
  <div :id="id" class="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
    <!-- Iterate over images to display -->
    <a
      v-for="(image, key) in images"
      :key="key"
      :href="image.bigImage ? image.bigImage : image.image"
      target="_blank"
      :data-pswp-width="image?.width ? image?.width : '1800px'"
      :data-pswp-height="image?.height ? image?.height : '1200px'"
      rel="noreferrer"
      class="border shadow rounded-sm p-1"
    >
      <!-- Display image with link -->
      <img :src="image.image" alt="" class="w-full h-full rounded-lg" />
    </a>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, defineProps } from "vue";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

// Define props
const props = defineProps({
  images: {
    type: Array,
    require: true,
  },
  id: {
    type: String,
    default: "phaneendra",
    required: true,
  },
});

// Initialize lightbox on component mount
let lightbox = null;
onMounted(() => {
  if (!lightbox) {
    lightbox = new PhotoSwipeLightbox({
      arrowKeys: true,
      zoom: true,
      clickToCloseNonZoomable: false,
      escKey: true,
      doubleTapAction: false,
      wheelToZoom: true,
      gallery: "#" + props.id,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
  }
});

// Clean up lightbox on component unmount
onUnmounted(() => {
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
});
</script>
