import s from './ConfirmModal.module.scss';
import { Button, Checkbox, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MerchantProvider } from '@/features/subscriptions/model/subscriptionsApi.types';
import { useTranslations } from 'next-intl';

type Props = {
  // eslint-disable-next-line no-unused-vars
  setShowModal: (show: boolean) => void;
  paymentUrl: string;
  isLoading: boolean;
  paymentMerchant?: MerchantProvider;
};

export const ConfirmModal = ({ setShowModal, paymentUrl, isLoading, paymentMerchant }: Props) => {
  const t = useTranslations('Profile');

  const [isChecked, setChecked] = useState(false);
  const router = useRouter();
  const handlePaymentClick = () => router.push(paymentUrl);

  return (
    <Modal title={t('ConfirmModal.Title')} className={s.modal} onClose={() => setShowModal(false)}>
      <div>{t('ConfirmModal.Text')}</div>
      {paymentMerchant === 'PAYPAL' && <div className={s.paypal}>{t('ConfirmModal.PaypalText')}</div>}
      <div className={s.checkbox}>
        <Checkbox label={t('ConfirmModal.Agree')} checked={isChecked} onChange={() => setChecked(!isChecked)} />

        <Button disabled={!isChecked || isLoading} onClick={handlePaymentClick}>
          {t('ConfirmModal.Ok')}
        </Button>
      </div>
    </Modal>
  );
};
