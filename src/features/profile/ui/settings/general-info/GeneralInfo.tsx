import { GeneralInfoForm } from '@/shared/ui/general-info-form/GeneralInfoForm';
import { AvatarActions } from '@/features/profile/ui/settings/general-info/avatar-actions/AvatarActions';
import { Alertpopup, LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';
import { useRequestError } from '@/shared/hooks/useRequestError';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/features/profile/api/profileApi';
import { ProfileFormValues } from '@/features/profile/model/profileApi.types';
import s from './GeneralInfo.module.scss';

export const GeneralInfo = () => {
  const { data: profileData, isLoading, error } = useGetProfileQuery();
  const [updateProfile, { isLoading: updateProfileIsLoading }] = useUpdateProfileMutation();
  const errorMessage = useRequestError(error);

  const onSubmitProfileFormHandler = async (data: ProfileFormValues) => {
    const formattedData = {
      ...data,
      dateOfBirth: new Date(data.dateOfBirth).toISOString()
    };
    await updateProfile(formattedData);
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
          defaultValues={{
            userName: profileData?.userName || '',
            firstName: profileData?.firstName || '',
            lastName: profileData?.lastName || '',
            aboutMe: profileData?.aboutMe || '',
            city: profileData?.city || '',
            country: profileData?.country || '',
            dateOfBirth: profileData?.dateOfBirth
          }}
        />
      </div>
    </>
  );
};
