'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, DatePicker, Input, Select, SelectItem, Textarea } from '@internshipsamyrai44-ui-kit/components-lib';
import { useForm } from 'react-hook-form';

import { ProfileBase } from '@/features/profile/model/profileApi.types';
import {
  ProfileFormValidationScheme,
  profileFormValidationScheme
} from '@/features/profile/model/profileFormValidationScheme';
import s from './GeneralInfoForm.module.scss';
import { useTranslations } from 'next-intl';

type Props = {
  disabled: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmitProfileForm: (data: Omit<ProfileBase, 'id' | 'createdAt'>) => Promise<void>;
  profileData: Partial<ProfileFormValidationScheme>;
};

const selectOptionsCountry: string[] = ['Russia', 'Belarus', 'Serbia'];
const selectOptionsCity: string[] = ['Moscow', 'Saint Petersburg', 'Minsk', 'Gomel', 'Belgrade', 'Novi Sad'];

export const GeneralInfoForm = ({ disabled, onSubmitProfileForm, profileData }: Props) => {
  const t = useTranslations('Auth');
  const tProfile = useTranslations('Profile');
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
        label={t('Username')}
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
        label={tProfile('FirstName')}
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
        label={tProfile('LastName')}
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
        label={tProfile('DateOfBirth')}
        date={getValues('dateOfBirth')}
        disabledDates={{ after: new Date(), before: new Date('1900-01-01') }}
        onChange={(date) => {
          if (date) {
            setValue('dateOfBirth', new Date(date.toLocaleString()));
          }
        }}
      />

      <div className={s.location}>
        <Select
          placeholder={tProfile('Country')}
          value={getValues('country')}
          onValueChange={(value) => setValue('country', value)}
        >
          {selectOptionsCountry.map((option, index) => (
            <SelectItem key={index} value={option}>
              <span>{tProfile(`Countrys.${option}`)}</span>
            </SelectItem>
          ))}
        </Select>

        <Select
          placeholder={tProfile('City')}
          value={getValues('city')}
          onValueChange={(value) => setValue('city', value)}
        >
          {selectOptionsCity.map((option, index) => (
            <SelectItem key={index} value={option}>
              <span>{tProfile(`Citys.${option}`)}</span>
            </SelectItem>
          ))}
        </Select>
      </div>
      <Textarea placeholder={tProfile('AboutMe')} {...register('aboutMe')} label={tProfile('AboutMe')} />

      <Button variant="primary" type="submit" className={s['submit-button']}>
        {tProfile('SaveChanges')}
      </Button>
    </form>
  );
};
