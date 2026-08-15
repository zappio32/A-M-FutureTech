export function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string) {
  return phone.replace(/\s+/g, '').length >= 8;
}

export function validateRequired(value: string) {
  return value.trim().length > 0;
}
