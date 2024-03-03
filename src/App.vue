<template>
  <div>
    <button class="btn-primary" @click="show()">Show Modal</button>
  </div>
</template>

<script setup>
import { showToast, loadingToast, closeToast } from "@/js/Toaster.js";
const show = async () => {
  showToast(
    "success",
    "Hey success Toast",
    "This is the message that we need to share"
  );
  setTimeout(() => {
    showToast(
      "error",
      "Hey error Toast",
      "This is the message that we need to share"
    );
  }, 1000);

  setTimeout(() => {
    showToast(
      "info",
      "Hey info Toast",
      "This is the message that we need to share"
    );
  }, 2000);

  setTimeout(() => {
    showToast(
      "warning",
      "Hey warning Toast",
      "This is the message that we need to share"
    );
  }, 3000);

  const id = loadingToast("we are fetching the details.");
  setTimeout(() => {
    closeToast(id);
  }, 2000);
};
</script>
