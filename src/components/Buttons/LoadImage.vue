    <template >
    <div class="absolute top-8 right-0  transform translate-x-[120%] -translate-y-1/2 z-30">
        <label for="ticketImageInput" class="cursor-pointer">
        <div
            class="bg-blue-600 text-white p-3 rounded-full shadow hover:bg-blue-700 transition place-items-center "
        >
            <!-- Иконка камеры (можно заменить на SVG или использовать иконки из Font Awesome / Heroicons) -->
            <span>Либо загрузите фото билета</span>
            <svg    
            xmlns="http://www.w3.org/2000/svg"
            class=" h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
            </svg>
        </div>
        </label>

        <!-- Скрытое поле для выбора файла -->
        <input
        id="ticketImageInput"
        type="file"
        accept="image/*"
        @change="handleImageUpload"
        class="hidden"
        />
    </div>
    </template>
    <script>
    import { extractTicketDataFromImage } from '@/components/services/ocrService.js';

export default {
  name: 'LoadImage',
  methods: {
    async handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      try {
        const extractedData = await extractTicketDataFromImage(file);
        this.$emit('image-processed', extractedData); // Отправляем данные наверх
      } catch (error) {
        alert('Не удалось обработать изображение.');
        console.error(error);
      }
    },
  },
};
    </script>
    <style >
    </style>