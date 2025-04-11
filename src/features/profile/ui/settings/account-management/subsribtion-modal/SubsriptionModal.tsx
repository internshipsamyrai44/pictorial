import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import s from '@/features/profile/ui/settings/account-management/AccountManagement.module.scss';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  // eslint-disable-next-line no-unused-vars
  setIsModalOpen: (arg: boolean) => void;
  isPaymentSuccessfull: boolean;
};

export const SubscriptionModal = ({ setIsModalOpen, isPaymentSuccessfull }: Props) => {
  const t = useTranslations('Profile');
  const router = useRouter();
  const searchParams = useSearchParams();

  const title = isPaymentSuccessfull ? t('SuccessModal.Title') : t('FailModal.Title');
  const text = isPaymentSuccessfull ? t('SuccessModal.Text') : t('FailModal.Text');
  const buttonText = isPaymentSuccessfull ? t('SuccessModal.Button') : t('FailModal.Button');

  const handleCloseModal = () => {
    setIsModalOpen(false);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('?success');
    router.replace(`?${newParams}`);
  };

  return (
    <Modal onClose={handleCloseModal} title={title} className={s.modal}>
      <p>{text} </p>
      <Button onClick={handleCloseModal}>{buttonText}</Button>
    </Modal>
  );
};
