<template>
  <Canvas v-bind="FormJson?.sidebar" :isShow="sidebar" @close="closeSidebar">
    <template #body>
      <!-- form container -->
      <FormContainer :fields="formJson" @receive-data="updateData" />
    </template>
  </Canvas>
</template>
<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import Canvas from "./SlideOver.vue";
import FormContainer from "./FormContainer.vue";
import FormJson from "@/json/form.json";

const props = defineProps({
  item: {
    type: Object,
  },
});
const emit = defineEmits(["close"]);
// to show and hide the sidebar
const sidebar = ref(true);
const formValues = ref({});

// getting the fields from json
const formJson = ref(FormJson?.fields);

const updateData = (data) => {
  formValues.value = data;
  closeSidebar();
};

const PopulateData = () => {
  if (props.item && Object.keys(props.item)?.length) {
    // Iterate over each object in the formJson array
    formJson.value.forEach((obj) => {
      obj.value = props.item[obj?.key];
      if (obj?.group && obj?.group?.length) {
        obj.group.forEach((subKey) => {
          subKey.value = props.item[subKey?.key];
        });
      }
    });
  }
};
const closeSidebar = () => {
  sidebar.value = false;
  emit("close");
};
onMounted(PopulateData);
</script>
