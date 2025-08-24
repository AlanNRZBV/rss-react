import { z } from 'zod';
import { COUNTRIES } from '@/lib/static/countries.ts';
import { GENDERS } from '@/lib/static/genders.ts';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const validCountries = COUNTRIES.map((item) => item.name);
const validGenders = [...GENDERS].slice(1).map((item) => item.value);

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Z]/, 'Name must start with uppercase letter'),
    age: z.coerce
      .number()
      .int('Invalid age')
      .min(1, 'Age cannot be negative')
      .max(100, 'Age seems unrealistic'),
    email: z.email({ pattern: z.regexes.html5Email }),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[0-9]/, 'Password must contain at least 1 number')
      .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least 1 special character'
      ),
    confirmPassword: z.string(),
    gender: z
      .string()
      .min(0, 'Gender is required')
      .refine(
        (val) => validGenders.includes(val),
        'Please select a valid gender'
      ),
    termsAndConditions: z.preprocess(
      (val) => val === 'on',
      z.boolean().refine((val) => val, {
        message: 'You must accept Terms and Conditions',
      })
    ),
    country: z
      .string()
      .min(1, 'Country is required')
      .refine(
        (val) => validCountries.includes(val),
        'Please select a valid country'
      ),
    images: z
      .instanceof(File, { message: 'Invalid file type' })
      .refine((file) => !!file, 'Image is required.')
      .refine((file) => file.size <= MAX_FILE_SIZE, 'Max file size is 5MB.')
      .refine(
        (file) => ALLOWED_IMAGE_TYPES.includes(file.type),
        'Only .jpg, .jpeg, and .png formats are supported.'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
