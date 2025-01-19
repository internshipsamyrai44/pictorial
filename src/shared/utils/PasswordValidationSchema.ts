import * as yup from 'yup';

export const MAX_COUNT_PASSWORD = 20;
export const MIN_COUNT_PASSWORD = 6;

export const getPasswordValidationSchema = (): yup.StringSchema =>
  yup
    .string()
    .required('Password is required')
    .min(MIN_COUNT_PASSWORD, `Minimum number of characters is ${MIN_COUNT_PASSWORD}`)
    .max(MAX_COUNT_PASSWORD, `Maximum number of characters is ${MAX_COUNT_PASSWORD}`)
    .matches(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]).+$/,
      'Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character.'
    )
    .matches(/^[A-Za-z0-9!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]+$/, 'The password contains invalid characters');
