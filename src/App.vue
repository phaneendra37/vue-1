<template>
  <div>
    <button class="btn-primary" @click="show()">Show Modal</button>
    {{ isOkay }}
    <Modal
      ref="confirmation"
      text="phaneendra kumar"
      heading="Are you sure you want to proceed?"
      description="By confirmation you will lose the record, it will not be return once deleted the data."
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/global/confirmationModal.vue";
const confirmation = ref(null);
const isOkay = ref(false);
const show = async () => {
  const test = await confirmation.value.showModal();
  isOkay.value = test;
};
</script>
