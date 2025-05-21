<template>
  <div>
    <div
      v-if="step === 2"
      class="w-full max-w-md bg-white rounded-2xl shadow p-6"
    >
      <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">
        Шаг 2: Ввод данных багажа
      </h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Поля формы -->
        <div>
          <label class="block mb-1 font-medium text-gray-700">Длина (см)</label>
          <input
            type="number"
            v-model.number="localBaggage.length"
            required
            min="1"
            max="300"
            class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          />
          <p v-if="errors.baggageLength" class="text-red-500 text-sm">
            {{ errors.baggageLength }}
          </p>
        </div>

        <div>
          <label class="block mb-1 font-medium text-gray-700">Ширина (см)</label>
          <input
            type="number"
            v-model.number="localBaggage.width"
            required
            min="1"
            max="300"
            class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          />
          <p v-if="errors.baggageWidth" class="text-red-500 text-sm">
            {{ errors.baggageWidth }}
          </p>
        </div>

        <div>
          <label class="block mb-1 font-medium text-gray-700">Высота (см)</label>
          <input
            type="number"
            v-model.number="localBaggage.height"
            required
            min="1"
            max="300"
            class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          />
          <p v-if="errors.baggageHeight" class="text-red-500 text-sm">
            {{ errors.baggageHeight }}
          </p>
        </div>

        <div>
          <label class="block mb-1 font-medium text-gray-700">Вес (кг)</label>
          <input
            type="number"
            v-model.number="localBaggage.weight"
            required
            min="1"
            max="50"
            class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          />
          <p v-if="errors.baggageWeight" class="text-red-500 text-sm">
            {{ errors.baggageWeight }}
          </p>
        </div>

        <div class="flex justify-between">
          <button
            type="button"
            @click="$emit('prev-step')"
            class="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
          >
            Назад
          </button>
          <button
            type="submit"
            class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Далее
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { validateBaggageForm } from "@/components/services/useBaggageValidation.js";
const props = defineProps({
  baggage: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    required: true,
  },
  step: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update:baggage", "submit","prev-step"]);

const localBaggage = ref({ ...props.baggage });

watch(
  () => props.baggage,
  (newVal) => {
    localBaggage.value = { ...newVal };
  }
);
// const updateBagage = (field, value) => {
//   localBaggage.value[field] = value;
//   emit("update:baggage", { ...localBaggage.value });
// };
const handleSubmit = () => {
  validateBaggageForm(localBaggage.value, props.errors, () => {
    emit("submit");
  });
};
</script>
<style >
</style>