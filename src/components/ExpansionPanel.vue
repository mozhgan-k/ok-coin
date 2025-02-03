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
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="expansion-panel">
    <div class="panel-header" @click="toggleOpen">
      <span class="panel-title text-primary">{{ title }}</span>
      <ChevronLeft v-if="!isOpen" width="15px" height="18px" class="text-primary"/>
      <ChevronDown v-else width="15px" height="18px" class="text-primary"/>
    </div>
    <Transition name="expand">
      <div v-if="isOpen" class="panel-content">
        <slot></slot>
      </div>
    </Transition>
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
  padding: 20px;
  background-color: #fafafa;
  font-size: 14px;
  text-align: justify;
  line-height: 32px;
  overflow: hidden;
}

.panel-title{
  font-size: 14px;
}

.expand-enter-active, .expand-leave-active {
  transition: max-height 0.2s ease-in-out, opacity 0.2s ease-in-out;
}

.expand-enter-from, .expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to, .expand-leave-from {
  max-height: fit-content; /* Adjust as needed */
  opacity: 1;
}
</style>
