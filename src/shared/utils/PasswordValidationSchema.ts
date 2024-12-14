import * as yup from 'yup';

export const MAX_COUNT_PASSWORD = 20;
export const MIN_COUNT_PASSWORD = 6;

export const getPasswordValidationSchema = (): yup.StringSchema =>
  yup
    .string()
    .required('Password is required')
    .matches(/^[A-Za-z\d!#/+*$]+$/, 'Use Latin letters only')
    .matches(/^.{6,999}$/, `Minimum number of characters ${MIN_COUNT_PASSWORD}`)
    .matches(/^.{1,20}$/, `Maximum number of characters ${MAX_COUNT_PASSWORD}`)
    .matches(
      // eslint-disable-next-line
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]+$/,
      'The password contains invalid characters'
    );
