import { GeneralInfoForm } from '@/shared/ui/general-info-form/GeneralInfoForm';
import { AvatarActions } from '@/features/profile/ui/settings/general-info/avatar-actions/AvatarActions';
import { Alertpopup, LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';
import { useRequestError } from '@/shared/hooks/useRequestError';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/features/profile/api/profileApi';

import s from './GeneralInfo.module.scss';
import { ProfileBase } from '@/features/profile/model/profileApi.types';

export const GeneralInfo = () => {
  const { data: profileData, isLoading, error } = useGetProfileQuery();

  const [updateProfile, { isLoading: updateProfileIsLoading }] = useUpdateProfileMutation();

  const errorMessage = useRequestError(error);

  const onSubmitProfileFormHandler = async (data: Omit<ProfileBase, 'id' | 'createdAt'>) => {
    updateProfile(data);
  };

  if (isLoading) return <LoaderLinear />;

  return (
    <>
      {updateProfileIsLoading && <LoaderLinear />}
      {errorMessage && <Alertpopup alertType={'error'} message={errorMessage} />}
      <div className={s.container}>
        <AvatarActions />
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
