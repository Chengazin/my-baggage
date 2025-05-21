<template >
  <div
    v-if="step === 1"
    class="w-full max-w-md bg-white rounded-2xl shadow p-6"
  >
    <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">
      Шаг 1: Ввод данных билета
    </h1>
    <form @submit.prevent="handleSubmit" class=" relative space-y-4">
      <div>
        <label class="block mb-1 font-medium text-gray-700">Номер билета</label>
        <input
          type="text"
          v-model="localTicket.ticketNumber"
          @input="updateTicket('ticketNumber', $event.target.value)"
          required
          class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
        />
        <p v-if="errors.ticketNumber" class="text-red-500 text-sm">
          {{ errors.ticketNumber }}
        </p>
      </div>
      <ImageLoader />
      <div>
        <label class="block mb-1 font-medium text-gray-700">Авиакомпания</label>
        <input
          type="text"
          v-model="localTicket.airline"
          @input="updateTicket('airline', $event.target.value)"
          required
          class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
        />
        <p v-if="errors.airline" class="text-red-500 text-sm">
          {{ errors.airline }}
        </p>
      </div>
      <div>
        <label class="block mb-1 font-medium text-gray-700">Откуда</label>
        <input
          type="text"
          v-model="localTicket.fromLocation"
          @input="updateTicket('fromLocation', $event.target.value)"
          required
          class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
        />
        <p v-if="errors.fromLocation" class="text-red-500 text-sm">
          {{ errors.fromLocation }}
        </p>
      </div>
      <div>
        <label class="block mb-1 font-medium text-gray-700">Куда</label>
        <input
          type="text"
          v-model="localTicket.toLocation"
          @input="updateTicket('toLocation', $event.target.value)"
          required
          class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
        />
        <p v-if="errors.toLocation" class="text-red-500 text-sm">
          {{ errors.toLocation }}
        </p>
      </div>
      <div>
        <label class="block mb-1 font-medium text-gray-700">Тариф</label>
        <input
          type="text"
          v-model="localTicket.tariff"
          @input="updateTicket('tariff', $event.target.value)"
          required
          class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
        />
        <p v-if="errors.tariff" class="text-red-500 text-sm">
          {{ errors.tariff }}
        </p>
      </div>
      <div>
        <label class="block mb-1 font-medium text-gray-700">Длина (см)</label>
        <input
          type="number"
          v-model="localTicket.ticketLength"
          @input="updateTicket('ticketLength', $event.target.value)"
          required
          min="1"
          max="300"
          class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
        />
        <p v-if="errors.ticketLength" class="text-red-500 text-sm">
          {{ errors.ticketLength }}
        </p>
      </div>
      <div>
        <label class="block mb-1 font-medium text-gray-700">Ширина (см)</label>
        <input
          type="number"
          v-model="localTicket.ticketWidth"
          @input="updateTicket('ticketWidth', $event.target.value)"
          required
          min="1"
          max="300"
          class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
        />
        <p v-if="errors.ticketWidth" class="text-red-500 text-sm">
          {{ errors.ticketWidth }}
        </p>
      </div>
      <div>
        <label class="block mb-1 font-medium text-gray-700">Высота (см)</label>
        <input
          type="number"
          v-model="localTicket.ticketHeight"
          @input="updateTicket('ticketHeight', $event.target.value)"
          required
          min="1"
          max="300"
          class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
        />
        <p v-if="errors.ticketHeight" class="text-red-500 text-sm">
          {{ errors.ticketHeight }}
        </p>
      </div>
      <div>
        <label class="block mb-1 font-medium text-gray-700">Вес (кг)</label>
        <input
          type="number"
          v-model="localTicket.ticketWeight"
          @input="updateTicket('ticketWeight', $event.target.value)"
          required
          min="1"
          max="50"
          class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
        />
        <p v-if="errors.ticketWeight" class="text-red-500 text-sm">
          {{ errors.ticketWeight }}
        </p>
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Далее
      </button>
      
    </form>

  </div>
</template>
<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { validateTicketForm } from "@/components/services/useTicketValidation.js";
import ImageLoader  from "@/components/Buttons/LoadImage.vue";
const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    required: true,
  },
  step: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:ticket", "submit"]);

// Создаем локальную реактивную копию
const localTicket = ref({ ...props.ticket });

// При каждом изменении ticket извне — обновляем локальную копию
watch(
  () => props.ticket,
  (newVal) => {
    localTicket.value = { ...newVal };
  }
);

// При изменении формы — обновляем родителя
const updateTicket = (field, value) => {
  localTicket.value[field] = value;
  emit("update:ticket", { ...localTicket.value });
};

const handleSubmit = () => {
  const isValid = validateTicketForm(localTicket.value, props.errors, () => {
    emit("submit");
  });
  console.log("localTicket:", localTicket.value);
  console.log("props.errors:", props.errors);
  if (!isValid) return;
};
</script>
<style >
</style>