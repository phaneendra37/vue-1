<template>
  <div>
    <FormSlider :item="prepopulate" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import FormSlider from "@/components/global/FormSlideOver.vue";
const prepopulate = ref({});
</script>
