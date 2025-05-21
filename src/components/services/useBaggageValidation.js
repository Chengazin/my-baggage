export const validateBaggageForm = (baggage,errors,nextStep) => {
    errors.value = {}; // Очистка ошибок
  
    if (baggage.length <= 0 || baggage.length > 300)
      errors.value.baggageLength = 'Длина должна быть в диапазоне от 1 до 300 см.';
    if (baggage.width <= 0 || baggage.width > 300)
      errors.value.baggageWidth = 'Ширина должна быть в диапазоне от 1 до 300 см.';
    if (baggage.height <= 0 || baggage.height > 300)
      errors.value.baggageHeight = 'Высота должна быть в диапазоне от 1 до 300 см.';
    if (baggage.weight <= 0 || baggage.weight > 50)
      errors.value.baggageWeight = 'Вес должен быть в диапазоне от 1 до 50 кг.';
  
    if (Object.keys(errors.value).length === 0){nextStep();  return true;} 
    return false
    
  };