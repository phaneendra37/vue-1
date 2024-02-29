<template>
  <div>
    <button class="btn-primary" @click="sidebar = true">Open Sidebar</button>
    <Canvas :isShow="sidebar" @close="toggleSidebar" @save="toggleSidebar" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import Canvas from "@/components/global/SlideOver.vue";
const sidebar = ref(true);

const toggleSidebar = (data) => {
  console.log("okay");
  sidebar.value = data;
};
</script>
