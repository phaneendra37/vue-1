<template>
  <div class="w-full px-4 md:p-0">
    <!-- Loading indicator -->
    <div v-if="isBusy">Loading please wait....</div>

    <!-- Data container -->
    <div
      v-else
      class=""
      :class="isBodyScroll ? '' : 'overflow-auto max-h-[400px]'"
      ref="recordContainer"
    >
      <!-- Confirmation Modal -->
      <ConfirmationModal
        ref="confirmation"
        heading="Are you sure you want to delete?"
        description="by confirmation you wont get the data back again, this will remove the data permanently"
        cancelText="Cancel"
        confirmText="Delete"
      />

      <!-- Form Container -->
      <formContainer
        :key="isSideBar"
        :fieldJson="fieldJson"
        :show="isSideBar"
        :item="editDataJson"
        @close="closeSidebar"
        @save="updateData"
      />

      <!-- List of data items -->
      <div
        v-for="(item, index) in duplicateData"
        :key="index"
        class="border p-3 rounded-lg shadow-sm flex justify-between mb-2 hover:shadow hover:border-neutral-950 w-full"
      >
        <div class="flex items-center">
          <!-- Item ID -->
          <span class="text-sm text-gray-600 pr-1">{{ item?.id }}. </span>

          <!-- Item Email -->
          <span class="text-[13px] text-gray-600">{{ item?.email }}</span>
        </div>

        <!-- Item OTP -->
        <div class="flex items-center">
          <span class="text-base font-semibold text-gray-600">{{
            item?.otp
          }}</span>
        </div>

        <!-- Edit Button -->
        <div
          class="text-blue-500 font-medium text-xs cursor-pointer hover:text-blue-400"
          @click="editData(item)"
        >
          edit
        </div>

        <!-- Delete Button -->
        <div
          class="text-red-500 font-medium text-xs cursor-pointer hover:text-red-400"
          @click="deleteRecord(item)"
        >
          Delete
        </div>
      </div>

      <!-- Additional data fetching indicator -->
      <div v-if="isMoreBusy">fetching additional data</div>

      <!-- Maximum records reached message -->
      <p v-if="isMaxLimit">You have reached the maximum records</p>
    </div>
  </div>
</template>

<script setup>
import { useData } from "@/js/Data.js";
import { showToast } from "@/js/Toaster.js";
import { ref, defineProps, onMounted, onUnmounted } from "vue";

import ConfirmationModal from "./ConfirmationModal.vue";
import formContainer from "../global/FormSlideOver.vue";

const props = defineProps({
  limit: {
    type: Number,
    default: 25,
    required: true,
  },
  getUrl: {
    type: String,
    required: true,
  },
  isBodyScroll: {
    default: true,
    type: Boolean,
  },
  deleteApi: {
    type: String,
    required: true,
  },
  fieldJson: {
    type: Object,
    default: () => {}, // Assuming formJson is defined somewhere
  },
});

const offsetValue = ref(0);
const data = ref([]);
const duplicateData = ref([]);
const isMaxLimit = ref(false);
const initialLoading = ref(true);
const isMoreBusy = ref(false);
const isBusy = ref(true);
const recordContainer = ref(null);
const isListener = ref(true);
const isSideBar = ref(false);
const editDataJson = ref({});
const confirmation = ref();

// Fetch data function
const getData = async () => {
  try {
    const getApi = `${props.getUrl}?limit=${props.limit}&offset=${offsetValue.value}`;
    const response = await useData("get", getApi);
    isBusy.value = false;
    initialLoading.value = false;
    if (response?.length < props?.limit) {
      BodyScrollListener();
      isMaxLimit.value = true;
    }
    offsetValue.value = offsetValue.value + props.limit;
    duplicateData.value.push(...response);
    data.value.push(...response);
  } catch (error) {
    showToast("error", "Please try again", error?.message);
  }
};

// Infinite scroll function
const infinityScrollBody = async () => {
  const { scrollTop, clientHeight, scrollHeight } = props.isBodyScroll
    ? document.body
    : recordContainer.value;
  if (
    !isMaxLimit.value &&
    scrollTop + clientHeight >= scrollHeight - 50 &&
    !isMoreBusy.value
  ) {
    isMoreBusy.value = true;
    await getData();
    isMoreBusy.value = false;
  }
};

// Edit data function
const editData = (item) => {
  isSideBar.value = true;
  editDataJson.value = item;
};

// Add/remove scroll event listener function
const BodyScrollListener = (type) => {
  if (props.isBodyScroll) {
    if (type === "add") {
      document.body.addEventListener("scroll", infinityScrollBody);
    } else {
      isListener.value = false;
      document.body.removeEventListener("scroll", infinityScrollBody);
    }
  } else {
    setInterval(() => {
      if (type === "add") {
        recordContainer.value.addEventListener("scroll", infinityScrollBody);
      } else {
        isListener.value = false;
        recordContainer.value.removeEventListener("scroll", infinityScrollBody);
      }
    }, 1000);
  }
};

// Delete record function
const deleteRecord = async (item) => {
  if (!item?.id || !props?.deleteApi) return;
  else {
    const decision = await confirmation.value.showModal();
    if (!decision) return;
    const response = await useData(
      "delete",
      `${props.deleteApi}?id=${item?.id}`
    );
    if (response) {
      const index = duplicateData.value.indexOf(item);
      const index2 = data.value.indexOf(item);
      duplicateData.value.splice(index, 1);
      data.value.splice(index2, 1);
      confirmation.value.hideModal();
    }
  }
};

// Update record function
const updateData = async (item) => {
  if (!item?.id) return;
  const duplicateRecord = { ...item };
  delete duplicateRecord.id;
  const response = await useData(
    "put",
    `${props.deleteApi}?id=${item?.id}`,
    duplicateRecord
  );
  if (response) {
    const updateRecord = duplicateData.value.findIndex((record) => {
      return record?.id == item?.id;
    });
    const updateRecord2 = data.value.findIndex((record) => {
      return record?.id == item?.id;
    });
    duplicateData.value[updateRecord] = item;
    data.value[updateRecord2] = item;
    isSideBar.value = false;
  }
};

// Close sidebar function
const closeSidebar = () => {
  isSideBar.value = false;
};

// Fetch data on component mount
onMounted(() => {
  getData();
  if (duplicateData?.value && duplicateData.value?.length < props.limit) {
    BodyScrollListener("add");
  }
});

// Remove event listener when the component is unmounted
onUnmounted(() => {
  if (isListener.value) BodyScrollListener();
});
</script>
