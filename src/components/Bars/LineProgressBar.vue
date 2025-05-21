<template>
  <!-- Контейнер -->
  <div v-if="currentStep < totalSteps" class="w-full max-w-md mb-4">
    <div class="bg-gray-200  rounded-full h-2 overflow-hidden">
      <!-- Прогресс -->
      <div
        class="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  totalSteps: {
    type: Number,
    default: 3,
  },
});

const progress = computed(() => (props.currentStep / props.totalSteps) * 100);
</script>
<style >
</style>