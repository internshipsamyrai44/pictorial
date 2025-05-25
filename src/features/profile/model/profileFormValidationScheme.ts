import * as yup from 'yup';

export const profileFormValidationScheme = yup.object({
  userName: yup
    .string()
    .trim()
    .min(6, 'Errors.UserNameMinCharacters')
    .max(20, 'Errors.UserNameMaxCharacters')
    .matches(/^[a-zA-Z0-9_-]*$/g, 'Errors.UserNameMatches')
    .required('Errors.UserNameRequired'),
  firstName: yup
    .string()
    .trim()
    .min(1, 'Errors.FirstNameMinCharacters')
    .max(50, 'Errors.FirstNameMaxCharacters')
    .matches(/^[a-zA-Zа-яА-Я0-9_-]*$/g, `Errors.FirstNameMatches`)
    .required('Errors.FirstNameRequired'),
  lastName: yup
    .string()
    .trim()
    .min(1, 'Errors.LastNameMinCharacters')
    .max(50, 'Errors.LastNameMaxCharacters')
    .matches(/^[a-zA-Zа-яА-Я0-9_-]*$/g, `Errors.LastNameMatches`)
    .required('Errors.LastNameRequired'),
  aboutMe: yup
    .string()
    .trim()
    .max(200, 'Errors.AboutMeMaxCharacters')
    .matches(/^[\s\S]*$/, `Errors.AboutMeMatches`)
    .transform((value) => (value === null ? '' : value)),
  city: yup.string().transform((value) => (value === null ? '' : value)),
  country: yup.string().transform((value) => (value === null ? '' : value)),
  dateOfBirth: yup.date().optional()
});

export type ProfileFormValidationScheme = yup.InferType<typeof profileFormValidationScheme>;
