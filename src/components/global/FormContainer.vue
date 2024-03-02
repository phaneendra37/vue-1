<template>
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
              v-for="input in item?.group"
              :key="input"
              :item="input"
            />
          </template>
          <!-- end of each input element -->
        </template>
        <!-- enf of prepend form -->

        <!-- start of main form -->
        <FieldContainer :item="item" />
        <!-- end of main form -->

        <!-- start of the append form -->
        <template v-if="item?.groupType === 'append'">
          <!-- start of each input element -->
          <template v-if="item?.group && item?.group?.length">
            <!-- start of each input element -->
            <FieldContainer
              v-for="input in item?.group"
              :key="input"
              :item="input"
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
</template>

<script setup>
import { defineProps, ref } from "vue";
import FieldContainer from "./FieldContainer.vue";
const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
});

const formFields = ref(props.fields);
</script>
