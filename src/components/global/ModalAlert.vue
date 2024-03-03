<template>
  <!-- Modal component with dynamic properties -->
  <Modal
    :is-show="show"
    :isHeader="false"
    :is-sidebar="false"
    :is-footer="false"
    size="w-full md:w-[450px]"
    body-class="p-8 bg-gray-50"
  >
    <!-- Template for the body of the modal -->
    <template #body>
      <div class="py-4">
        <!-- Dynamic image source based on variant -->
        <img
          v-if="variant"
          :src="`/images/${variant}.png`"
          class="w-[90px] h-[90px] mx-auto"
          alt="logo"
          height="96px"
          width="96px"
          loading="lazy"
        />
        <div class="text-center mt-6">
          <!-- Dynamic heading -->
          <h3 v-if="heading" class="font-semibold mb-2 text-base">
            {{ heading }}
          </h3>
          <!-- Dynamic description -->
          <p
            v-if="description"
            class="text-sm !leading-[1.6] text-neutral-950/60"
          >
            {{ description }}
          </p>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { ref, defineExpose } from "vue";
import Modal from "./SlideOver.vue";

// Reactive variables
const variant = ref("");
const heading = ref("");
const description = ref("");
const show = ref(false);

// Method to show the modal with provided parameters
const showModal = (color, title, desc, autoClose) => {
  if (color) {
    show.value = true;
    heading.value = title;
    description.value = desc;
    variant.value = color;
    // Auto close modal after specified time
    if (autoClose) {
      setTimeout(() => {
        hideModal();
      }, 5000);
    }
  } else return;
};

// Method to hide the modal
const hideModal = () => {
  show.value = false;
  setTimeout(() => {
    heading.value = "";
    description.value = "";
    variant.value = "";
  }, 1000);
};

// Expose methods to parent components
defineExpose({ showModal, hideModal });
</script>
