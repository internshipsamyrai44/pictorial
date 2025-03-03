'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, DatePicker, Input, Select, Textarea } from '@internshipsamyrai44-ui-kit/components-lib';
import { useForm } from 'react-hook-form';

import { ProfileBase } from '@/features/profile/model/profileApi.types';
import {
  ProfileFormValidationScheme,
  profileFormValidationScheme
} from '@/features/profile/model/profileFormValidationScheme';
import s from './GeneralInfoForm.module.scss';

type Props = {
  disabled: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmitProfileForm: (data: Omit<ProfileBase, 'id' | 'createdAt'>) => Promise<void>;
  profileData: Partial<ProfileFormValidationScheme>;
};

export const GeneralInfoForm = ({ disabled, onSubmitProfileForm, profileData }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors }
  } = useForm<ProfileFormValidationScheme>({
    defaultValues: profileData,
    resolver: yupResolver(profileFormValidationScheme),
    mode: 'onTouched'
  });

  const onSubmitFormHandler = (data: ProfileFormValidationScheme) => {
    onSubmitProfileForm({
      ...data,
      dateOfBirth: data.dateOfBirth?.toISOString() ?? ''
    });
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
        required={true}
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
        required={true}
      />

      <Input
        label="Last Name"
        placeholder=""
        disabled={disabled}
        {...register('lastName')}
        onBlur={async () => {
          await trigger('lastName');
        }}
        className="flex"
        errorMessage={errors.lastName && `${errors.lastName}`}
        required={true}
      />

      <DatePicker
        label={'Date of Birth'}
        date={getValues('dateOfBirth')}
        disabledDates={{ after: new Date(), before: new Date('1900-01-01') }}
        onChange={(date) => {
          if (date) {
            setValue('dateOfBirth', new Date(date.toLocaleString()));
          }
        }}
      />

      <div className={s.location}>
        <Select placeholder={'Country'} />
        <Select placeholder={'City'} />
      </div>
      <Textarea placeholder={'About Me'} {...register('aboutMe')} label={'About Me'} />

      <Button variant="primary" type="submit" className={s['submit-button']}>
        Save Changes
      </Button>
    </form>
  );
};
