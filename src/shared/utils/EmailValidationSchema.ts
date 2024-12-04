import * as yup from 'yup';

const emailRegex =
  // eslint-disable-next-line
  /^(([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*)|(".+"))[a-zA-Z0-9]@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(((([a-zA-Z0-9][a-zA-Z0-9\-]+[a-zA-Z0-9])|([a-zA-Z0-9]{1,2}))[\.]{1})+([a-zA-Z]{2,6})))$/;

const getEmailValidationSchema = (
  // if Email field is optional, pass false
  isFieldRequired: boolean = true
): yup.StringSchema => {
  let schema = yup.string().trim();

  if (isFieldRequired) {
    schema = schema.required('Email is required');
  }

  return schema.matches(emailRegex, 'Invalid email');
};

export const EmailValidationSchema = yup
  .object({
    new_email: getEmailValidationSchema()
  })
  .required();
