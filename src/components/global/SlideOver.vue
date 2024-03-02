<template>
  <TransitionRoot as="div" :show="isShow" :class="dialogClass">
    <!-- start of the dialog -->
    <Dialog as="div" class="relative z-10">
      <!-- start of backdrop overlay -->
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          v-if="isOverlay"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>
      <!-- end of backdrop overlay -->

      <!-- start of taking the overall screen -->
      <div
        class="fixed inset-0 overflow-hidden"
        @click="$emit('close', false)"
        @keydown.esc="$emit('close', false)"
      >
        <!-- start of overlay from left to right -->
        <div
          :class="
            isSidebar
              ? 'pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'
              : 'flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'
          "
        >
          <!-- start of transition child for the white screen-->
          <TransitionChild
            as="template"
            :enter="
              isSidebar
                ? 'transform transition ease-in-out duration-500 sm:duration-700'
                : 'ease-out duration-300'
            "
            :enter-from="
              isSidebar
                ? 'translate-x-full'
                : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            "
            :enter-to="
              isSidebar
                ? 'translate-x-0'
                : 'opacity-100 translate-y-0 sm:scale-100'
            "
            :leave="
              isSidebar
                ? 'transform transition ease-in-out duration-500 sm:duration-700'
                : 'ease-in duration-200'
            "
            :leave-from="
              isSidebar
                ? 'translate-x-0'
                : 'opacity-100 translate-y-0 sm:scale-100'
            "
            :leave-to="
              isSidebar
                ? 'translate-x-full'
                : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            "
          >
            <DialogPanel
              :class="`${size} ${
                isSidebar
                  ? 'pointer-events-auto relative z-50'
                  : 'relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 z-50'
              }`"
            >
              <!-- start of the overlay for the close icon -->
              <div
                :class="
                  isSidebar
                    ? 'absolute left-0 top-0 -ml-7 pt-2.5 flex pr-4'
                    : 'absolute right-6 top-4'
                "
                v-if="isHeaderClose"
              >
                <!-- start of the close button -->
                <button
                  type="button"
                  class="relative text-gray-200 hover:text-white focus:outline-none focus:ring-0"
                  @click="$emit('close', false)"
                >
                  <!-- start of close icon -->
                  <i class="bi bi-x-lg" />
                  <!-- end of close icon -->
                </button>
                <!-- end of the close button -->
              </div>
              <!-- end of the overlay for the close icon -->
              <div
                class="flex h-full flex-col bg-white"
                :class="isSidebar ? 'overflow-y-auto' : 'overflow-hidden'"
              >
                <!-- start of the header content  -->
                <div v-if="isHeader" :class="headerClass">
                  <slot name="header">
                    <h3 class="font-[700] text-sm text-white mb-1">
                      {{ title }}
                    </h3>
                    <p class="text-xs text-gray-100">{{ subTitle }}</p>
                  </slot>
                </div>
                <!-- end of the header content -->

                <!-- start of the body content -->
                <div
                  class="relative flex-1 overflow-auto"
                  :class="{ [bodyClass]: true }"
                >
                  <!-- Render the body slot content -->
                  <slot name="body"></slot>
                </div>
                <!-- end of the body content -->

                <!-- start of the footer  -->
                <div
                  v-if="isFooter"
                  :class="footerClass"
                  class="flex justify-end items-center gap-x-3"
                >
                  <!-- start of cancel slot -->
                  <slot name="footer" />
                  <!-- end of cancel slot -->

                  <!--  start of cancel button -->
                  <button
                    v-if="isCancelButton"
                    :disabled="isCancelling"
                    class="btn-secondary"
                    @click="$emit('close', false)"
                  >
                    <span v-if="isCancelling"></span>
                    {{ cancelButtonLabel }}
                  </button>
                  <!--  end of cancel button -->

                  <!-- start of save button -->
                  <button
                    type="submit"
                    v-if="isSaveButton"
                    class="btn-primary"
                    :disabled="isSaving"
                    @click="$emit('save', true)"
                  >
                    <span v-if="isSaving"></span>
                    {{ saveButtonLabel }}
                  </button>
                  <!-- end of save button -->
                </div>
                <!-- end of the footer -->
              </div>
            </DialogPanel>
          </TransitionChild>
          <!-- end of transition child for the white screen-->
        </div>
        <!-- end of overlay from left to right -->
      </div>
      <!-- end of taking the overall screen -->
    </Dialog>
    <!-- end of the dialog -->
  </TransitionRoot>
</template>

<script setup>
import { defineProps, defineSlots, defineEmits } from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

// eslint-disable-next-line no-unused-vars
const { body, header, footer } = defineSlots();

// defining the emits
defineEmits(["save", "close"]);

defineProps({
  // title of the modal
  title: {
    type: String,
    default: "Modal Title",
  },
  // sub title of the modal
  subTitle: {
    type: String,
    default: "Modal subTitle",
  },
  // close icon for the header
  isHeaderClose: {
    default: true,
    type: Boolean,
  },
  // hide or show the header
  isHeader: {
    default: true,
    type: Boolean,
  },
  // hide or show the footer
  isFooter: {
    default: true,
    type: Boolean,
  },
  // for the background overlay
  isOverlay: {
    default: true,
    type: Boolean,
  },
  // to hide or show the cancel button
  isCancelButton: {
    default: true,
    type: Boolean,
  },
  // to hide or show the save button
  isSaveButton: {
    default: true,
    type: Boolean,
  },
  // to change button label  for cancel
  cancelButtonLabel: {
    default: "Cancel",
    type: String,
  },
  // to change button label for save
  saveButtonLabel: {
    default: "Save",
    type: String,
  },
  // to change the process or enable the spinner
  isSaving: {
    default: false,
    type: Boolean,
  },
  // to change the process or enable the spinner
  isCancelling: {
    default: false,
    type: Boolean,
  },
  // to hide or show the sidebar
  isShow: {
    default: true,
    type: Boolean,
  },
  // to hide or show the sidebar
  size: {
    default: "w-[600px]",
    type: String,
  },
  // to add the class to the body
  bodyClass: {
    default: "p-4 bg-gray-50",
    type: String,
  },
  // to add the class to the footer
  footerClass: {
    default: "py-3 px-4 ",
    type: String,
  },
  // to add the class to modal header
  headerClass: {
    default: "py-3 px-4 bg-neutral-900",
    type: String,
  },
  // to add the class to the dialog
  dialogClass: {
    type: String,
    default: "",
  },
  // to change the modal to sidebar
  isSidebar: {
    default: true,
    type: Boolean,
  },
});
</script>
