import { GeneralInfoForm } from '@/shared/ui/general-info-form/GeneralInfoForm';
import { AvatarActions } from '@/features/profile/ui/settings/general-info/avatar-actions/AvatarActions';
import { Alertpopup, LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';
import { useRequestError } from '@/shared/hooks/useRequestError';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/features/profile/api/profileApi';

import s from './GeneralInfo.module.scss';
import { ProfileBase } from '@/features/profile/model/profileApi.types';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export const GeneralInfo = () => {
  const [isClient, setIsClient] = useState(false);

  const {
    data: profileData,
    isLoading,
    error
  } = useGetProfileQuery(undefined, {
    skip: !isClient
  });
  const [updateProfile, { isLoading: updateProfileIsLoading }] = useUpdateProfileMutation();
  const errorMessage = useRequestError(error);
  const t = useTranslations('Profile');
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const alertSubmitProfileFormMessage =
    alertType === 'error' ? t('Alert.ErrorAlert') : alertType === 'success' ? t('Alert.SuccessAlert') : '';

  const onSubmitProfileFormHandler = async (data: Omit<ProfileBase, 'id' | 'createdAt'>) => {
    setAlertType(null);
    try {
      await updateProfile({
        ...data,
        city: data.city ?? '',
        country: data.country ?? '',
        region: data.region ?? '',
        dateOfBirth: data.dateOfBirth ?? '',
        aboutMe: data.aboutMe ?? ''
      }).unwrap();
      setAlertType('success');
    } catch (err) {
      setAlertType('error');
    }
  };

  if (!isClient || isLoading) return <LoaderLinear />;

  return (
    <>
      {updateProfileIsLoading && <LoaderLinear />}
      {errorMessage && <Alertpopup alertType={'error'} message={errorMessage} />}
      {alertType && <Alertpopup alertType={alertType} message={alertSubmitProfileFormMessage} />}
      <div className={s.container}>
        <AvatarActions avatar={profileData?.avatars[0]?.url} userName={profileData?.userName} />
        <GeneralInfoForm
          disabled={updateProfileIsLoading}
          onSubmitProfileForm={onSubmitProfileFormHandler}
          profileData={{
            ...profileData,
            dateOfBirth: profileData?.dateOfBirth ? new Date(profileData.dateOfBirth) : undefined
          }}
        />
      </div>
    </>
  );
};
