<template>
  <div class="max-w-7xl mx-auto py-4 flex gap-x-6 items-center">
    <infinityScroll v-bind="jsonData" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import infinityScroll from "./components/global/infinityScroll.vue";
import infinityJson from "@/json/infinity.json";
const jsonData = ref(infinityJson);
</script>
