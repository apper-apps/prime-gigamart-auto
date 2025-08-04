export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateCreditCard = (number) => {
  // Remove spaces and dashes
  const cleanNumber = number.replace(/[\s\-]/g, "");
  
  // Check if it's all digits and has valid length
  if (!/^\d{13,19}$/.test(cleanNumber)) {
    return false;
  }
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

export const validateCVV = (cvv) => {
  return /^\d{3,4}$/.test(cvv);
};

export const validateExpiryDate = (expiry) => {
  const [month, year] = expiry.split("/").map(num => parseInt(num, 10));
  
  if (!month || !year) return false;
  if (month < 1 || month > 12) return false;
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;
  
  return true;
};

export const formatCreditCardNumber = (value) => {
  const cleanValue = value.replace(/\D/g, "");
  const match = cleanValue.match(/(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/);
  
  if (!match) return cleanValue;
  
  return [match[1], match[2], match[3], match[4]]
    .filter(Boolean)
    .join(" ");
};

export const formatExpiryDate = (value) => {
  const cleanValue = value.replace(/\D/g, "");
  if (cleanValue.length >= 2) {
    return cleanValue.substring(0, 2) + "/" + cleanValue.substring(2, 4);
  }
  return cleanValue;
};