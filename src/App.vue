<template>
  <div>
    <button class="btn-primary" @click="show()">Show Modal</button>
    <Modal ref="modalRef" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/global/ModalAlert.vue";

const modalRef = ref(null);

const show = () => {
  modalRef.value.showModal(
    "error",
    "This is the heading",
    "This is the description",
    true
  );
};
</script>
