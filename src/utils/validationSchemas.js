import * as Yup from 'yup';

export const reservationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),
    
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
    
  phone: Yup.string()
    .matches(/^[0-9+\s()-]{7,15}$/, 'Invalid phone format')
    .required('Phone number is required'),
    
  date: Yup.date()
    .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Date cannot be in the past')
    .required('Date is required'),
    
  time: Yup.string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)')
    .required('Time is required'),
    
  guests: Yup.number()
    .min(1, 'At least 1 guest is required')
    .max(20, 'For parties over 20, please contact us directly')
    .required('Number of guests is required'),
    
  occasion: Yup.string()
    .max(50, 'Occasion cannot exceed 50 characters'),
    
  specialRequests: Yup.string()
    .max(500, 'Special requests cannot exceed 500 characters')
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
    
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

// Function to validate a single field
export const validateField = async (schema, name, value) => {
  try {
    // Create a subset of the schema with just this field
    const fieldSchema = Yup.object({ [name]: schema.fields[name] });
    await fieldSchema.validate({ [name]: value }, { abortEarly: false });
    return { valid: true, error: null };
  } catch (error) {
    return { 
      valid: false, 
      error: error.errors ? error.errors[0] : 'Validation error' 
    };
  }
};

// Function to validate the entire form
export const validateForm = async (schema, values) => {
  try {
    await schema.validate(values, { abortEarly: false });
    return { valid: true, errors: {} };
  } catch (error) {
    const errors = {};
    if (error.inner) {
      error.inner.forEach(err => {
        errors[err.path] = err.message;
      });
    }
    return { valid: false, errors };
  }
};