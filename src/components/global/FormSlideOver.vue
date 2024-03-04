<template>
  <Canvas v-bind="formJson?.sidebar" :isShow="show" @close="closeSidebar">
    <template #body>
      <!-- form container -->
      <FormContainer
        :fields="formJson?.fields"
        @receive-data="updateData"
        @cancel="closeSidebar"
      />
    </template>
  </Canvas>
</template>
<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import Canvas from "./SlideOver.vue";
import FormContainer from "./FormContainer.vue";
import testForm from "@/json/form.json";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
  },
  fieldJson: {
    type: Object,
    default: () => testForm, // Assuming formJson is defined somewhere
  },
});
const emit = defineEmits(["close"]);
// to show and hide the sidebar
const formValues = ref();

// getting the fields from json
const formJson = ref(props?.fieldJson);
const updateData = (data) => {
  formValues.value = data?.value;
  emit("save", formValues.value);
};

const PopulateData = () => {
  if (props.item && Object.keys(props.item)?.length) {
    // Iterate over each object in the formJson array
    formJson?.value?.fields.forEach((obj) => {
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
  PopulateData();
  emit("close");
};
onMounted(PopulateData);
</script>
