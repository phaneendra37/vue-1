<template>
  <div>
    <button class="btn-primary" @click="show()">Show Modal</button>
  </div>
</template>

<script setup>
import { prideConfetti } from "@/js/Confetti.js";
import { showToast, closeToast } from "@/js/Toaster.js";
const show = async () => {
  prideConfetti();
  const id = showToast("success", "Confetti", "Hey this is the pride confetti");
  setTimeout(() => {
    closeToast(id);
  }, 4500);
};
</script>
