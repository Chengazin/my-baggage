<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4"
  >
    <!-- Прогресс-бар -->
    <LineProgressBar :current-step="step" :total-steps="3" />

    <!-- Шаг 1: Ввод данных билета -->
    <TicketForm
      v-if="step === 1"
      v-model:ticket="ticket"
      :errors="errors"
      :step="step"
      @submit="nextStep"
    />

    <!-- Шаг 2: Ввод данных багажа -->
    <BaggageForm
      v-if="step === 2"
      v-model:baggage="baggage"
      :errors="errors"
      :step="step"
      @submit="nextStep"
      @prevStep="prevStep"
    />
    <!-- Результат сверки -->
    <div
      v-if="step === 3"
      class="w-full max-w-md bg-white rounded-2xl shadow p-6 text-center"
    >
      <h1 class="text-2xl font-bold mb-4 text-gray-800">Результат проверки</h1>
      <p v-if="isMatching" class="text-green-500 text-xl">✅ Багаж подходит!</p>
      <p v-else class="text-red-500 text-xl">❌ Багаж не подходит.</p>
      <button
        @click="resetForm"
        class="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Начать заново
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import TicketForm from "@/components/Forms/TicketForm.vue";
import LineProgressBar from "@/components/Bars/LineProgressBar.vue";
import BaggageForm from "@/components/Forms/BaggageForm.vue";
// Данные билета
const ticket = ref({
  ticketNumber: "",
  airline: "",
  fromLocation: "",
  toLocation: "",
  tariff: "",
  ticketLength: null,
  ticketWidth: null,
  ticketHeight: null,
  ticketWeight: null,
});

// Данные багажа
const baggage = ref({
  length: null,
  width: null,
  height: null,
  weight: null,
});

// Состояния
const step = ref(1);
const checked = ref(false);
const isMatching = ref(false);

// Ошибки валидации
const errors = ref({});

// Вычисление прогресса

// Валидация формы билета

// Валидация формы багажа

// Переход к следующему шагу
const nextStep = () => {
  console.log("nextStep вызвана");
  if (step.value < 3) {
    step.value++;
    console.log("Шаг изменён:", step.value);
  }
  if (step.value === 3) {
    checkBaggage();
  }
};

// Возврат к предыдущему шагу
const prevStep = () => {
  if (step.value > 1) {
    step.value--;
  }
};

// Проверка соответствия багажа
const checkBaggage = () => {
  const isSizeMatching =
    baggage.value.length <= ticket.value.ticketLength &&
    baggage.value.width <= ticket.value.ticketWidth &&
    baggage.value.height <= ticket.value.ticketHeight;

  const isWeightMatching = baggage.value.weight <= ticket.value.ticketWeight;

  isMatching.value = isSizeMatching && isWeightMatching;
  checked.value = true;
};

// Сброс формы
const resetForm = () => {
  step.value = 1;
  ticket.value = {
    ticketNumber: "",
    airline: "",
    fromLocation: "",
    toLocation: "",
    tariff: "",
    ticketLength: null,
    ticketWidth: null,
    ticketHeight: null,
    ticketWeight: null,
  };
  baggage.value = {
    length: null,
    width: null,
    height: null,
    weight: null,
  };
  errors.value = {};
  checked.value = false;
  isMatching.value = false;
};
</script>

<style scoped>
</style>
