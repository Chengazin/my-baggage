import Tesseract from 'tesseract.js';

/*Распознаёт текст на изображении и возвращает данные билета*/
 
export async function extractTicketDataFromImage(file) {
    console.log('moew');

    try {
        // Шаг 1: Предобработка изображения
        const processedDataURL = await new Promise((resolve ) => {
            preprocessImage(file, resolve);
        });

        // Шаг 2: OCR на обработанном изображении
        const result = await Tesseract.recognize(processedDataURL, 'eng+rus');

        // Шаг 3: Парсим результат
        return parseTicketText(result.data.text);

    } catch (error) {
        console.error('Ошибка при распознавании текста ', error);
        throw new Error('Не удалось распознать текст изображения, попробуйте сделать более четкий кадр :(');
    }
}

/*Парсит распознанный текст и извлекает данные билета*/
function parseTicketText(text) {
    console.log('Распознанный текст:\n', text);

    const data = {};
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

    for (let line of lines) {
        line = line.toUpperCase(); // делаем регистронезависимый поиск

        console.log('Обрабатываем строку:', line); // Логируем каждую строку

        // Номер билета
        if (/\b\d{13}\b/.test(line)) {
            console.log('Найден номер билета:', line);
            data.ticketNumber = line;
        }

        // Авиакомпания 
        if (/AIR[A-Z]*\s[A-ZА-Я]+/i.test(line)) {
            let match = line.match(/([A-ZА-Я\s]+AIR[A-Z\s]*)/i);
            if (match) {
                data.airline = match[0].trim();
                console.log('Найдена авиакомпания:', data.airline);
            }
        }

        // IATA коды
        if (/([A-Z]{3})[^A-Z]*([A-Z]{3})/.test(line)) {
            const iataMatch = line.match(/([A-Z]{3})[^A-Z]*([A-Z]{3})/);
            data.fromLocation = iataMatch[1];
            data.toLocation = iataMatch[2];
            console.log('Найдены IATA коды:', data.fromLocation, '→', data.toLocation);
        }

        // Имя пассажира
        if (/([A-Z]+\/[A-Z]+)/i.test(line)) {
            const nameMatch = line.match(/([A-Z]+\/[A-Z]+)/i);
            data.passengerName = nameMatch[0];
            console.log('Найдено имя пассажира:', data.passengerName);
        }

        // Класс перелета
        if (/ECONOMY|BUSINESS|PREMIUM|CLASS/i.test(line)) {
            const classMatch = line.match(/(ECONOMY|BUSINESS|PREMIUM|CLASS)/i);
            data.tariff = classMatch[0];
            console.log('Найден класс:', data.tariff);
        }

        // Вес багажа
        const weightMatch = line.match(/(\d+\.?\d*)\s*(KG|КГ)/i);
        if (weightMatch) {
            data.ticketWeight = parseFloat(weightMatch[1]);
            console.log('Найден вес багажа:', data.ticketWeight);
        }

        // Дата вылета
        const dateMatch = line.match(/(NOV|DEC|JAN|FEB|MAR|APR|JUN|JUL|AUG|SEP|OCT)\s*\d+/i);
        if (dateMatch) {
            data.departureDate = dateMatch[0];
            console.log('Найдена дата вылета:', data.departureDate);
        }

        // Номер рейса (DP 569)
        if (/DP\s*\d+/i.test(line)) {
            const flightMatch = line.match(/DP\s*\d+/i);
            data.flightNumber = flightMatch[0];
            console.log('Найден номер рейса:', data.flightNumber);
        }
    }

    console.log('Финальные данные:', data); // Посмотрим, что собрали
    return data;
}

function preprocessImage(file) {
    return new Promise((resolve ) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Увеличиваем до 1024px
            const MAX_SIZE = 1024;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                height = Math.round((height *= MAX_SIZE / width));
                width = MAX_SIZE;
            } else {
                width = Math.round((width *= MAX_SIZE / height));
                height = MAX_SIZE;
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            // Градации серого
            let imageData = ctx.getImageData(0, 0, width, height);
            let data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg;
                data[i + 1] = avg;
                data[i + 2] = avg;
            }

            ctx.putImageData(imageData, 0, 0);

            // Бинаризация (threshold)
            imageData = ctx.getImageData(0, 0, width, height);
            data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
                const threshold = 150;
                const val = brightness > threshold ? 255 : 0;
                data[i] = val;
                data[i + 1] = val;
                data[i + 2] = val;
            }

            ctx.putImageData(imageData, 0, 0);

            // Возвращаем DataURL
            const processedDataURL = canvas.toDataURL('image/png');
            resolve(processedDataURL);
        };

    

        img.src = URL.createObjectURL(file);
    });
}