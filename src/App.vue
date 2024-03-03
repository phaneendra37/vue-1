<template>
  <div class="max-w-7xl mx-auto py-4">
    <button class="btn-primary" @click="show()">Show Modal</button>
    <PhotoSwipe :images="images" id="phaneendra" />
  </div>
</template>

<script setup>
import { prideConfetti } from "@/js/Confetti.js";
import { showToast, closeToast } from "@/js/Toaster.js";
import PhotoSwipe from "@/components/global/ImagesGallery.vue";
const images = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRratY6b5JzFXRWmdslP9qOpmqX65sn5_LXQQ&usqp=CAU",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcqGbFtMpQ4rEXvNMcx069IdUCAa2J3EXvtw&usqp=CAU",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA4lsMtFaM-NFoqECsbV2XNp5H_rrX53N2tB6OmhD5IxEW9BglkMCLVpIVnXw0L35Yiq8&usqp=CAU",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkPjr88f2-QQ0ZP6zG3DK7a7UwvGUVuEvFyA&usqp=CAU",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrFIhTZdH-SuGwBR814Ss52JgL5QIzKaogsQ&usqp=CAU",
  },
];

const show = async () => {
  prideConfetti();
  const id = showToast("success", "Confetti", "Hey this is the pride confetti");
  setTimeout(() => {
    closeToast(id);
  }, 4500);
};
</script>
