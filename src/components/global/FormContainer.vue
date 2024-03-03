<template>
  <form
    class="overflow-hidden flex flex-col h-full"
    @submit.prevent="submitForm"
  >
    <div class="grow p-6 overflow-auto">
      <div
        v-if="formFields && formFields?.length"
        class="grid gap-5 grid-cols-1 md:grid-cols-12"
      >
        <!-- start of the inputs -->
        <div
          v-for="(item, index) in formFields"
          :key="index"
          :class="item?.gridClass"
        >
          <!-- start of label -->
          <label
            v-if="item?.label"
            class="mb-1 text-sm block font-medium capitalize text-neutral-900"
          >
            {{ item?.label }}
          </label>
          <!-- end of label -->
          <!-- start of grouped-form or prepend-fields -->
          <div
            class="flex md:flex-row flex-col flex-nowrap"
            :class="{
              'grouped-form': item?.groupType,
              'prepend-fields': item?.group?.length === 1,
            }"
          >
            <!-- start of the prepend form -->
            <template v-if="item?.groupType === 'prepend'">
              <!-- start of each input element -->
              <template v-if="item?.group && item?.group?.length">
                <FieldContainer
                  v-for="(input, subindex) in item?.group"
                  :key="input"
                  :item="input"
                  :index="index"
                  :subindex="subindex"
                  @update-value="updateValue"
                />
              </template>
              <!-- end of each input element -->
            </template>
            <!-- enf of prepend form -->

            <!-- start of main form -->
            <FieldContainer
              :item="item"
              :index="index"
              @update-value="updateValue"
            />
            <!-- end of main form -->

            <!-- start of the append form -->
            <template v-if="item?.groupType === 'append'">
              <!-- start of each input element -->
              <template v-if="item?.group && item?.group?.length">
                <!-- start of each input element -->
                <FieldContainer
                  v-for="(input, subindex) in item?.group"
                  :key="input"
                  :item="input"
                  :index="index"
                  :subindex="subindex"
                  @update-value="updateValue"
                ></FieldContainer>
                <!-- end of each input element -->
              </template>
              <!-- end of each input element -->
            </template>
            <!-- enf of append form -->
          </div>
          <!-- end of grouped-form or prepend-fields -->

          <!-- start of form description -->
          <div v-if="item?.description" class="mt-1.5">
            <span class="line-clamp-2 text-neutral-500/50 text-[11px]">{{
              item?.description
            }}</span>
          </div>
          <!-- start of form description -->
        </div>
      </div>
    </div>
    <div class="flex border-t py-3 px-6 bg-white justify-end gap-x-4">
      <!-- start of save button -->
      <button class="btn-secondary">Cancel</button>
      <!-- end of save button -->
      <!-- start of save button -->
      <button type="submit" class="btn-primary">Save</button>
      <!-- end of save button -->
    </div>
  </form>
</template>
<script setup>
// Importing necessary Vue features
import { defineProps, onMounted, ref, defineEmits } from "vue";
import FieldContainer from "./FieldContainer.vue";

// Defining props received by the component
const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
});
// Defining emit function to emit events
const emit = defineEmits(["receive-data"]);

// Creating reactive references for form fields and values
const formFields = ref(props.fields);
const formValues = ref({});

// Function to update the value of a form field
const updateValue = (data, index, subindex) => {
  // Check if the field is a group field
  if (subindex || subindex === 0) {
    // Access the group field and update its value
    const group = formFields.value[index]?.group;
    if (group && group.length) {
      group[subindex].value = data;
      // Update form values after field value is updated
      updateObjectValues();
    }
  } else {
    // Update the value of a single field
    formFields.value[index].value = data;
    // Update form values after field value is updated
    updateObjectValues();
  }
};

// Function to update form values based on form fields
const updateObjectValues = () => {
  // Clear existing form values
  formValues.value = {};
  // Iterate through form fields to update form values
  formFields.value.forEach((item) => {
    // Set key-value pair for each form field
    const key = item.key;
    formValues.value[key] = item.value;
    // If field is a group field, iterate through its sub-items
    if (item.group && item.group.length) {
      item.group.forEach((subItem) => {
        // Set key-value pair for each sub-item
        formValues.value[subItem.key] = subItem.value;
      });
    }
  });
};
const submitForm = () => {
  emit("receive-data", formValues);
};

// Call updateObjectValues function once the component is mounted
onMounted(updateObjectValues);
</script>
