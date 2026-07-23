export const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);
export const isValidOTP = (otp) => /^\d{6}$/.test(otp);
