<template>
  <!-- Modal component with dynamic content and buttons -->
  <Modal
    :is-show="show"
    :is-sidebar="false"
    :is-footer="false"
    :is-header="false"
    body-class="p-8 bg-gray-50"
    size="w-[400px]"
  >
    <template #body>
      <div>
        <!-- Dynamic heading -->
        <div class="mb-10 text-center" v-if="heading">
          <h3 class="font-semibold mb-2.5 text-base">{{ heading }}</h3>
          <!-- Dynamic description -->
          <p class="text-sm !leading-[1.6] text-neutral-950/60">
            {{ description }}
          </p>
        </div>
        <!-- Buttons to confirm or cancel action -->
        <div class="flex items-center gap-x-4">
          <!-- Button to cancel action -->
          <button @click="cancel" class="grow btn-secondary">
            {{ cancelText }}
          </button>
          <!-- Button to confirm action -->
          <button @click="confirm" class="grow btn-primary">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { ref, defineExpose, defineProps } from "vue";
import Modal from "./SlideOver.vue";

// Reactive variable to control modal visibility
const show = ref(false);

// Props definition for dynamic content and button texts
defineProps({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  confirmText: {
    type: String,
    default: "Confirm",
  },
  cancelText: {
    type: String,
    default: "Cancel",
  },
});

// Variable to store the resolve function of the promise
let modalPromiseResolve;

// Function to show the modal and return a promise
const showModal = async () => {
  show.value = true;
  return new Promise((resolve) => {
    modalPromiseResolve = resolve;
  });
};

// Function to confirm the action and close the modal
const confirm = () => {
  modalPromiseResolve(true);
  show.value = false;
};

// Function to cancel the action and close the modal
const cancel = () => {
  modalPromiseResolve(false);
  show.value = false;
};

// Expose the showModal function to parent components
defineExpose({ showModal });
</script>
