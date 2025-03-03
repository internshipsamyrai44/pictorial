import * as yup from 'yup';

export const profileFormValidationScheme = yup.object({
  userName: yup
    .string()
    .trim()
    .min(6, 'Username must be at least 6 characters')
    .max(20, 'Username must be at most 20 characters')
    .matches(/^[a-zA-Z0-9_-]*$/g, `Username must contain a-z, A-Z, 0-9, -`)
    .required('Username is required'),
  firstName: yup
    .string()
    .trim()
    .min(1, 'First Name must be at least 1 character')
    .max(50, 'First Name must be at most 50 characters')
    .matches(/^[a-zA-Zа-яА-Я0-9_-]*$/g, `First Name must contain a-z, A-Z, 0-9, -`)
    .required('First Name is required'),
  lastName: yup
    .string()
    .trim()
    .min(1, 'Last Name must be at least 1 character')
    .max(50, 'Last Name must be at most 50 characters')
    .matches(/^[a-zA-Zа-яА-Я0-9_-]*$/g, `Last Name must contain a-z, A-Z, 0-9, -`)
    .required('Last Name is required'),
  aboutMe: yup
    .string()
    .trim()
    .max(200, 'About Me must be at most 200 characters')
    .matches(/^[a-zA-Zа-яА-Я0-9!#$%&'()*+,\-./:;<=>?@[\\\]^_`{|} ]*$/g, `About Me must contain valid characters`)
    .transform((value) => (value === null ? '' : value)),
  city: yup.string().transform((value) => (value === null ? '' : value)),
  country: yup.string().transform((value) => (value === null ? '' : value)),
  dateOfBirth: yup.date().optional()
});

export type ProfileFormValidationScheme = yup.InferType<typeof profileFormValidationScheme>;
