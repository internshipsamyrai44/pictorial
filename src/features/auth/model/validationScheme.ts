import * as yup from 'yup';
import { getEmailValidationSchema, getPasswordValidationSchema } from '@/shared/utils';

export const signUpSchema = yup
  .object({
    userName: yup
      .string()
      .min(6, 'Username must be at least 6 characters')
      .max(30, 'Username must be at most 30 characters')
      .matches(
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores, without spaces or special characters'
      )
      .required('Username is required'),
    email: getEmailValidationSchema().required('Email is required'),
    password: getPasswordValidationSchema().required('Password is required'),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    terms: yup
      .bool()
      .required('You must accept the terms and conditions')
      .oneOf([true], 'You must accept the terms and conditions')
  })
  .required();

export const registrationEmailResendSchema = yup.object({
  email: getEmailValidationSchema().required('Email is required')
});

export type FormRegistrationEmailResend = yup.InferType<typeof registrationEmailResendSchema>;

export type FormSignUp = yup.InferType<typeof signUpSchema>;
