import * as yup from 'yup';
import { getEmailValidationSchema, getPasswordValidationSchema } from '@/shared/utils/';

export const signUpSchema = yup
  .object({
    userName: yup.string().max(20, 'Username must be at most 20 characters').required('Username is required'),
    email: getEmailValidationSchema().required('Email is required'),
    password: getPasswordValidationSchema().required('Password is required'),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    terms: yup.boolean().oneOf([true, false]).isTrue('You must accept the terms and conditions')
  })
  .required();

export type FormSignUp = yup.InferType<typeof signUpSchema>;
