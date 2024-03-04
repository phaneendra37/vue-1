<template>
  <div class="max-w-7xl mx-auto py-4 flex gap-x-6 items-center">
    <infinityScroll v-bind="jsonData" :field-json="FormFields" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { prideConfetti } from "@/js/Confetti.js";
import FormFields from "@/json/sidebar.json";
import infinityScroll from "./components/global/infinityScroll.vue";
import infinityJson from "@/json/infinity.json";
const jsonData = ref(infinityJson);
onMounted(prideConfetti);
</script>
