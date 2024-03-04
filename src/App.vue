<template>
  <div class="max-w-7xl mx-auto py-4 flex gap-x-6 items-center">
    <button class="btn-primary" @click="show()">Show Modal</button>
    <div v-if="users && users?.length">{{ users }}</div>
    <div v-else>PLease wait...</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useData } from "@/js/Data.js";
import { showToast } from "@/js/Toaster.js";
const users = ref([]);
const show = async () => {
  try {
    const data = await useData(
      "get",
      "https://three7apps.onrender.com/auth/v2/pre_auth",
      { email: "kphaneendta337@gma.com", otp: 452112 }
    );
    users.value = data;
  } catch (error) {
    showToast("error", "Failed to fetch", error?.message);
  }
};
</script>
