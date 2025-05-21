// composables/useTicketValidation.js
export const validateTicketForm = (ticket, errors, nextStep) => {
  // Очистка предыдущих ошибок
  errors.value = {};

  if (!ticket.ticketNumber)
    errors.value.ticketNumber = 'Поле "Номер билета" обязательно для заполнения.';
  if (!ticket.airline)
    errors.value.airline = 'Поле "Авиакомпания" обязательно для заполнения.';
  if (!ticket.fromLocation)
    errors.value.fromLocation = 'Поле "Откуда" обязательно для заполнения.';
  if (!ticket.toLocation)
    errors.value.toLocation = 'Поле "Куда" обязательно для заполнения.';
  if (!ticket.tariff)
    errors.value.tariff = 'Поле "Тариф" обязательно для заполнения.';
  if (ticket.ticketLength <= 0 || ticket.ticketLength > 300)
    errors.value.ticketLength = 'Длина должна быть в диапазоне от 1 до 300 см.';
  if (ticket.ticketWidth <= 0 || ticket.ticketWidth > 300)
    errors.value.ticketWidth = 'Ширина должна быть в диапазоне от 1 до 300 см.';
  if (ticket.ticketHeight <= 0 || ticket.ticketHeight > 300)
    errors.value.ticketHeight = 'Высота должна быть в диапазоне от 1 до 300 см.';
  if (ticket.ticketWeight <= 0 || ticket.ticketWeight > 50)
    errors.value.ticketWeight = 'Вес должен быть в диапазоне от 1 до 50 кг.';

  if (Object.keys(errors.value).length === 0) {
    nextStep();
    return true;
  }

  return false;
};