<script setup lang="ts">
import { ref } from 'vue';
import ChevronLeft from "./Icons/ChevronLeft.vue";
import ChevronDown from "./Icons/ChevronDown.vue";

const props = defineProps<{
  title: string;
  defaultOpen: boolean
}>();

const isOpen = ref(props.defaultOpen);
const toggleOpen = () => {
  console.log("open", isOpen.value)
}
</script>

<template>
  <div class="expansion-panel">
    <div class="panel-header" @click="toggleOpen">
      <span class="panel-title text-primary">{{ title }}</span>
      <ChevronLeft v-if="!isOpen" width="15px" height="18px" class="text-primary"/>
      <ChevronDown v-else width="15px" height="18px" class="text-primary"/>
    </div>
    <div v-show="isOpen" class="panel-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.expansion-panel {
  border-radius: 7px;
  background-color: #F9F9F9;
}

.panel-header {
  background-color: #f5f5f5;
  padding: 16px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-header:not(:last-child) {
  border-bottom: 1px solid rgba(241, 237, 237, 0.69);
}

.panel-content {
  padding: 10px;
  background-color: #fafafa;
}

.panel-title{
  font-size: 14px;
}
</style>
