<template>
  <div class="mt-4 flex items-center gap-3 px-6">
    <button class="btn-primary" @click="(sidebar = true), (isSidebar = true)">
      Open Sidebar
    </button>
    <button class="btn-primary" @click="(sidebar = true), (isSidebar = false)">
      Open modal
    </button>
    <Canvas
      :isShow="sidebar"
      @close="toggleSidebar"
      :isSidebar="isSidebar"
      @save="toggleSidebar"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import Canvas from "@/components/global/SlideOver.vue";
const sidebar = ref(true);
const isSidebar = ref(true);
const toggleSidebar = (data) => {
  sidebar.value = data;
};
</script>
