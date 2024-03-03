<template>
  <div :class="item?.fieldClass" class="grow relative">
    <!-- start of textarea field -->
    <textarea
      v-if="item?.inputType === 'textarea'"
      :placeholder="item?.placeholder"
      :disabled="item?.disabled"
      :id="item?.key"
      :value="item?.value"
      :readonly="item?.readonly"
      :pattern="item?.pattern"
      :autofocus="item?.autofocus"
      :required="item?.required"
      :max="item?.maxlength"
      :maxlength="item?.maxlength"
      :min="item?.minlength"
      :minlength="item?.minlength"
      class="form-input"
      autocomplete="on"
      :cols="item?.cols"
      :rows="item?.rows"
      spellcheck
      :size="item?.size"
      :class="{
        'resize-none ': item?.resize,
      }"
      @input="updateValue($event.target.value, index, subindex)"
    />
    <!-- end of textarea field -->

    <!-- start of select field -->
    <select
      v-else-if="item?.inputType === 'select'"
      :disabled="item?.disabled"
      :id="item?.key"
      :value="item?.value"
      :readonly="item?.readonly"
      :required="item?.required"
      class="form-input"
      :size="item?.size"
      spellcheck
      :autofocus="item?.autofocus"
      :class="{
        'resize-none ': item?.resize,
      }"
      :multiple="item?.multiple"
      @input="updateValue($event.target.value, index, subindex)"
    >
      <!-- start of select options -->
      <template v-if="item?.options && item?.options?.length">
        <option value="" disabled>
          {{ item?.placeholder }}
        </option>
        <option
          v-for="option in item?.options"
          :key="option"
          :value="option.value"
          :disabled="option?.disabled"
        >
          {{ option.name }}
        </option>
      </template>
      <!-- end of select options -->
    </select>
    <!-- end of select field -->

    <!-- start of input element -->
    <template v-else>
      <!-- start of the icon -->
      <div
        class="absolute inset-y-0 flex items-center pointer-events-none z-[5]"
        :class="
          item?.iconPlacement === 'left' ? 'start-0  ps-3.5' : 'end-0  pe-3.5'
        "
      >
        <!-- start of icon tag -->
        <i :class="item?.icon" class="text-gray-300" />
        <!-- end of icon tag -->
      </div>
      <!-- end of the icon -->
      <input
        :placeholder="item?.placeholder"
        :disabled="item?.disabled"
        :type="item?.type"
        :id="item?.key"
        :value="item?.value"
        :readonly="item?.readonly"
        :pattern="item?.pattern"
        :autofocus="item?.autofocus"
        :required="item?.required"
        :max="item?.maxlength"
        :maxlength="item?.maxlength"
        :min="item?.minlength"
        :minlength="item?.minlength"
        class="form-input"
        autocomplete="on"
        spellcheck
        :size="item?.size"
        :class="{
          '!h-[48px] !py-1 !px-1.5 bg-white': item.type === 'color',
          [item?.class]: true,
          'appearance-none -webkit-appearance-none': true,
          '!pl-10': item?.icon && item?.iconPlacement === 'left',
          '!pr-10': item?.icon && item?.iconPlacement === 'right',
        }"
        @input="updateValue($event.target.value, index, subindex)"
      />
    </template>
    <!-- end of input element -->
  </div>
</template>
<script setup>
// Importing necessary Vue features
import { defineProps, defineEmits } from "vue";

// Defining props received by the component
defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  subindex: {
    type: Number,
  },
});

// Defining emit function to emit events
const emit = defineEmits(["update-value"]);

// Function to update the value of a field
const updateValue = (value, index, subindex) => {
  // Emitting 'update-value' event with the new value
  emit("update-value", value, index, subindex);
};
</script>
