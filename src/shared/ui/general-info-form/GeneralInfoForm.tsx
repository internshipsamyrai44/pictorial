import React from 'react';
import { Button, DatePicker, Input, Select, Textarea } from '@internshipsamyrai44-ui-kit/components-lib';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileFormValues } from '@/features/profile/model/profileApi.types';
import {
  ProfileFormValidationScheme,
  profileFormValidationScheme
} from '@/features/profile/model/profileFormValidationScheme';
import s from './GeneralInfoForm.module.scss';

type Props = {
  disabled: boolean;
  onSubmitProfileForm: (data: ProfileFormValues) => Promise<void>;
  defaultValues: ProfileFormValues;
};

export const GeneralInfoForm = ({ disabled, onSubmitProfileForm, defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid }
  } = useForm<ProfileFormValidationScheme>({
    defaultValues,
    resolver: yupResolver(profileFormValidationScheme),
    mode: 'onTouched'
  });

  const onSubmitFormHandler = async (data: ProfileFormValues) => {
    await onSubmitProfileForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitFormHandler)} noValidate className={s.form}>
      <Input
        label="Username"
        placeholder="Usertest"
        disabled={disabled}
        {...register('userName')}
        onBlur={async () => {
          await trigger('userName');
        }}
        errorMessage={errors.userName && `${errors.userName}`}
      />

      <Input
        label="First Name"
        placeholder=""
        disabled={disabled}
        {...register('firstName')}
        onBlur={async () => {
          await trigger('firstName');
        }}
        errorMessage={errors.firstName && `${errors.firstName}`}
      />

      <Input
        label="Last Name"
        placeholder=""
        disabled={disabled}
        {...register('lastName')}
        onBlur={async () => {
          await trigger('lastName');
        }}
        errorMessage={errors.lastName && `${errors.lastName}`}
      />

      <DatePicker
        label={'Date of Birth'}
        date={defaultValues.dateOfBirth}
        onChange={(date) => setValue('dateOfBirth', date)} // Устанавливаем значение даты в форму
      />

      <Select placeholder={'Country'} />
      <Select placeholder={'City'} />
      <Textarea placeholder={'About Me'} {...register('aboutMe')} label={'About Me'} />

      <Button variant="primary" type="submit" disabled={disabled || !isValid} className={s['submit-button']}>
        Save Changes
      </Button>
    </form>
  );
};
