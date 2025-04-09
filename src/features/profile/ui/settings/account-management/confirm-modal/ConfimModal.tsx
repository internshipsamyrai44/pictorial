import s from './ConfirmModal.module.scss';
import { Button, Checkbox, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MerchantProvider } from '@/features/subscriptions/model/subscriptionsApi.types';

type Props = {
  // eslint-disable-next-line no-unused-vars
  setShowModal: (show: boolean) => void;
  paymentUrl: string;
  isLoading: boolean;
  paymentType?: MerchantProvider;
};

export const ConfirmModal = ({ setShowModal, paymentUrl, isLoading, paymentType }: Props) => {
  const [isChecked, setChecked] = useState(false);
  const router = useRouter();
  const handlePaymentClick = () => router.push(paymentUrl);

  return (
    <Modal title={'Subscribe'} className={s.modal} onClose={() => setShowModal(false)}>
      <div>Auto-renewal will be enabled with this payment. You can disable it anytime in your profile settings</div>
      {paymentType === 'PAYPAL' && <div className={s.paypal}>To pay via PayPal you must have an account</div>}
      <div className={s.checkbox}>
        <Checkbox label={'Agree'} checked={isChecked} onChange={() => setChecked(!isChecked)} />

        <Button disabled={!isChecked || isLoading} onClick={handlePaymentClick}>
          Ok
        </Button>
      </div>
    </Modal>
  );
};
