<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <!-- Форма для ввода данных билета -->
      <div class="w-full max-w-md bg-white rounded-2xl shadow p-6 mb-6">
        <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">Ввод данных билета</h1>
        <form @submit.prevent="handleTicketSubmit" class="space-y-4">
          <div>
            <label class="block mb-1 font-medium text-gray-700">Номер билета</label>
            <input type="text" v-model="ticketNumber" required class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-700">Авиакомпания</label>
            <input type="text" v-model="airline" required class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-700">Откуда</label>
            <input type="text" v-model="fromLocation" required class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-700">Куда</label>
            <input type="text" v-model="toLocation" required class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-700">Тариф</label>
            <input type="text" v-model="tariff" required class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-700">Длина (см)</label>
            <input type="number" v-model.number="ticketLength" required class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-700">Ширина (см)</label>
            <input type="number" v-model.number="ticketWidth" required class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-700">Высота (см)</label>
            <input type="number" v-model.number="ticketHeight" required class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-700">Вес (кг)</label>
            <input type="number" v-model.number="ticketWeight" required class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Проверить данные билета
          </button>
        </form>
      </div>
  
      <!-- Форма для ввода данных багажа -->
      <div class="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">Ввод данных багажа</h1>
        <form @submit.prevent="handleBaggageSubmit" class="space-y-4">
          <div>
            <label class="block mb-1 font-medium text-gray-700">Длина (см)</label>
            <input type="number" v-model.number="length" required class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-700">Ширина (см)</label>
            <input type="number" v-model.number="width" required class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-700">Высота (см)</label>
            <input type="number" v-model.number="height" required class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label class="block mb-1 font-medium text-gray-700">Вес (кг)</label>
            <input
              type="number"
              v-model.number="weight"
              class="w-full border rounded px-3 py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введите вес багажа"
            />
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Проверить багаж
          </button>
        </form>
      </div>
  
      <!-- Результат сверки -->
      <div v-if="checked" class="mt-6 text-xl font-semibold">
        <p v-if="isMatching" class="text-green-500">✅ Багаж подходит!</p>
        <p v-else class="text-red-500">❌ Багаж не подходит.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Данные билета
  const ticketNumber = ref('');
  const airline = ref('');
  const fromLocation = ref('');
  const toLocation = ref('');
  const tariff = ref('');
  const ticketLength = ref(0);
  const ticketWidth = ref(0);
  const ticketHeight = ref(0);
  const ticketWeight = ref(0);
  
  // Данные багажа
  const length = ref(0);
  const width = ref(0);
  const height = ref(0);
  const weight = ref(0);
  
  // Состояния
  const checked = ref(false);
  const isMatching = ref(false);
  
  // Функция для проверки билета и багажа
  const handleTicketSubmit = () => {
    // Можно добавить проверку билета, если необходимо
    checked.value = false; // Сброс состояния перед новой проверкой
  };
  
  const handleBaggageSubmit = () => {
    const baggage = {
      length: length.value,
      width: width.value,
      height: height.value,
      weight: weight.value,
    };
  
    // Проверка совпадения данных билета и багажа
    isMatching.value = (
      baggage.length === ticketLength.value &&
      baggage.width === ticketWidth.value &&
      baggage.height === ticketHeight.value &&
      baggage.weight === ticketWeight.value &&
      airline.value === airline.value && // Просто пример сверки с авиакомпанией
      fromLocation.value === fromLocation.value && 
      toLocation.value === toLocation.value &&
      tariff.value === tariff.value
    );
  
    checked.value = true;
  };
  </script>
  
  <style scoped>
  /* Дополнительные стили могут быть добавлены по вашему усмотрению */
  </style>
  