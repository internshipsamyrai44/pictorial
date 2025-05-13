'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alertpopup,
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Textarea,
  Typography
} from '@internshipsamyrai44-ui-kit/components-lib';
import { useForm } from 'react-hook-form';

import { ProfileBase } from '@/features/profile/model/profileApi.types';
import {
  ProfileFormValidationScheme,
  profileFormValidationScheme
} from '@/features/profile/model/profileFormValidationScheme';
import s from './GeneralInfoForm.module.scss';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

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
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    trigger,
    formState: { errors, isValid }
  } = useForm<ProfileFormValidationScheme>({
    defaultValues: profileData,
    resolver: yupResolver(profileFormValidationScheme),
    mode: 'onTouched'
  });
  const selectedCountry = watch('country');
  const selectedCity = watch('city');

  const onSubmitFormHandler = (data: ProfileFormValidationScheme) => {
    setAlertMessage(null);
    console.log(alertMessage);

    const today = new Date();
    const birthDate = new Date(data.dateOfBirth ?? '');
    const age = today.getFullYear() - birthDate.getFullYear();
    const birthdayThisYear = new Date(birthDate);
    birthdayThisYear.setFullYear(today.getFullYear());
    const isUnder13 = age < 13 || (age === 13 && today < birthdayThisYear);

    if (isUnder13) {
      setAlertMessage(null);
      setTimeout(() => {
        setAlertMessage(tProfile('UserUnder13'));
      }, 0);
      return;
    }

    onSubmitProfileForm({
      ...data,
      dateOfBirth: data.dateOfBirth?.toISOString() ?? ''
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitFormHandler)} noValidate className={s.form}>
      {alertMessage && <Alertpopup alertType="error" message={alertMessage} />}
      <Input
        label={t('Username')}
        placeholder="Usertest"
        disabled={disabled}
        {...register('userName')}
        onBlur={async () => {
          await trigger('userName');
        }}
        errorMessage={errors.userName?.message ? tProfile(errors.userName.message) : undefined}
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
        errorMessage={errors.firstName?.message ? tProfile(errors.firstName.message) : undefined}
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
        errorMessage={errors.lastName?.message ? tProfile(errors.lastName.message) : undefined}
        required={true}
      />

      <DatePicker
        label={tProfile('DateOfBirth')}
        date={getValues('dateOfBirth')}
        disabledDates={{ after: new Date(), before: new Date('1900-01-01') }}
        onChange={(value: Date | unknown) => {
          if (value instanceof Date) {
            setValue('dateOfBirth', value);
          }
        }}
      />

      <div className={s.locations}>
        <div className={s.location}>
          <Typography variant={'regular-text-14'} className={s.locationLabel}>
            {tProfile('Country')}
          </Typography>
          <Select
            placeholder={tProfile('Country')}
            value={selectedCountry}
            onValueChange={(value) => setValue('country', value)}
          >
            {selectOptionsCountry.map((option, index) => (
              <SelectItem key={index} value={option}>
                <span>{tProfile(`Countrys.${option}`)}</span>
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className={s.location}>
          <Typography variant={'regular-text-14'} className={s.locationLabel}>
            {tProfile('City')}
          </Typography>
          <Select
            placeholder={tProfile('City')}
            value={selectedCity}
            onValueChange={(value) => setValue('city', value)}
          >
            {selectOptionsCity.map((option, index) => (
              <SelectItem key={index} value={option}>
                <span>{tProfile(`Citys.${option}`)}</span>
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <Textarea
        placeholder={tProfile('AboutMe')}
        {...register('aboutMe')}
        label={tProfile('AboutMe')}
        errorText={errors.aboutMe?.message ? tProfile(errors.aboutMe.message) : undefined}
      />

      <Button variant="primary" type="submit" className={s['submit-button']} disabled={!isValid || disabled}>
        {tProfile('SaveChanges')}
      </Button>
    </form>
  );
};
