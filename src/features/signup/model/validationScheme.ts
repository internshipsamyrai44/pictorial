import * as yup from 'yup';
import { getEmailValidationSchema, getPasswordValidationSchema } from '@/shared/utils/';

export const signUpSchema = yup
  .object({
    userName: yup
      .string()
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must be at most 20 characters')
      .required('Username is required'),
    email: getEmailValidationSchema().required('Email is required'),
    password: getPasswordValidationSchema().required('Password is required'),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    terms: yup.boolean().required('You must accept the terms and conditions').oneOf([true, false])
  })
  .required();

export type FormSignUp = yup.InferType<typeof signUpSchema>;
