// Shared form validation utilities to reduce repetition across auth forms

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: "Email is required" };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }
  
  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: "Password is required" };
  }
  
  if (password.length < 6) {
    return { isValid: false, error: "Password must be at least 6 characters long" };
  }
  
  return { isValid: true };
};

export const validatePasswordConfirm = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: "Please confirm your password" };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, error: "Passwords do not match" };
  }
  
  return { isValid: true };
};

export const validateUsername = (username: string): ValidationResult => {
  if (!username) {
    return { isValid: false, error: "Username is required" };
  }
  
  if (username.length < 2) {
    return { isValid: false, error: "Username must be at least 2 characters long" };
  }
  
  return { isValid: true };
};

export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || value.trim() === "") {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  return { isValid: true };
};

// Comprehensive form validation for login
export const validateLoginForm = (email: string, password: string): ValidationResult => {
  const emailResult = validateEmail(email);
  if (!emailResult.isValid) return emailResult;
  
  const passwordResult = validateRequired(password, "Password");
  if (!passwordResult.isValid) return passwordResult;
  
  return { isValid: true };
};

// Comprehensive form validation for registration
export const validateRegisterForm = (
  username: string, 
  email: string, 
  password: string, 
  confirmPassword: string
): ValidationResult => {
  const usernameResult = validateUsername(username);
  if (!usernameResult.isValid) return usernameResult;
  
  const emailResult = validateEmail(email);
  if (!emailResult.isValid) return emailResult;
  
  const passwordResult = validatePassword(password);
  if (!passwordResult.isValid) return passwordResult;
  
  const confirmResult = validatePasswordConfirm(password, confirmPassword);
  if (!confirmResult.isValid) return confirmResult;
  
  return { isValid: true };
};
