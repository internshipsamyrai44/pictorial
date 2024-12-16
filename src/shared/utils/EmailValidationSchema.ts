import * as yup from 'yup';

const emailRegex =
  // eslint-disable-next-line
  /^(([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*)|(".+"))[a-zA-Z0-9]@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(((([a-zA-Z0-9][a-zA-Z0-9\-]+[a-zA-Z0-9])|([a-zA-Z0-9]{1,2}))[\.]{1})+([a-zA-Z]{2,6})))$/;

export const getEmailValidationSchema = (): yup.StringSchema => {
  return yup.string().required('Email is required').trim().matches(emailRegex, 'Invalid email');
};
