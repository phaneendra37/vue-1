<template>
  <div class="w-full px-4 md:p-0">
    <div v-if="isBusy"></div>
    <div
      v-else
      class=""
      :class="isBodyScroll ? '' : 'overflow-auto max-h-[400px]'"
      ref="recordContainer"
    >
      <div
        v-for="(item, index) in duplicateData"
        :key="index"
        class="border p-3 rounded-lg shadow-sm flex justify-between mb-2 hover:shadow hover:border-neutral-950 w-full"
      >
        <div class="flex items-center">
          <span class="text-sm text-gray-600 pr-1"> {{ item?.id }}. </span>
          <span class="text-[13px] text-gray-600">{{ item?.email }}</span>
        </div>
        <div class="flex items-center">
          <span class="text-base font-semibold text-gray-600">{{
            item?.otp
          }}</span>
        </div>
      </div>
      <div v-if="isMoreBusy">fetching additional data</div>
      <p v-if="isMaxLimit">You have reached the maximum records</p>
    </div>
  </div>
</template>
<script setup>
import { useData } from "@/js/Data.js";
import { showToast } from "@/js/Toaster.js";
import { ref, defineProps, onMounted, onUnmounted } from "vue";

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
    data.value.push(response);
  } catch (error) {
    showToast("error", "Please try again", error?.message);
  }
};

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
