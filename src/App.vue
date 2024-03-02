<template>
  <div class="mt-4 flex items-center gap-3 px-6">
    <button class="btn-primary" @click="(sidebar = true), (isSidebar = true)">
      Open Sidebar
    </button>
    <div v-if="show">
      {{ FormJson }}
    </div>
    <Canvas
      :isShow="sidebar"
      @close="toggleSidebar"
      :isSidebar="isSidebar"
      @save="toggleSidebar"
      bodyClass="p-4 md:p-7 bg-gray-50"
      size="w-full md:w-[700px]"
      title="Dynamic form rendering from json"
      subTitle="This is the practicing of the vue3 form component and sidebar component"
    >
      <template #body>
        <FormContainer :fields="formJson" key="formJson" />
      </template>
    </Canvas>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Canvas from "@/components/global/SlideOver.vue";
import FormContainer from "@/components/global/FormContainer.vue";
import FormJson from "@/json/form.json";
const sidebar = ref(true);
const isSidebar = ref(true);
const toggleSidebar = (data) => {
  sidebar.value = data;
};
const show = ref(false);
const formJson = ref(FormJson);
</script>
