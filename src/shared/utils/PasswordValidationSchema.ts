import * as yup from 'yup';

export const MAX_COUNT_PASSWORD = 20;

export const getPasswordValidationSchema = (): yup.StringSchema => {
  return yup
    .string()
    .required('Password is required')
    .matches(/^[A-Za-z\d!#/+*$]+$/, 'Use Latin letters only')
    .matches(/^.{6,30}$/, `Password must be at most ${MAX_COUNT_PASSWORD} characters`)
    .matches(
      // eslint-disable-next-line
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]+$/,
      'The password contains invalid characters'
    );
};
