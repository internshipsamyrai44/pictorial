import s from './ConfirmModal.module.scss';
import { Button, Checkbox, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  // eslint-disable-next-line no-unused-vars
  setShowModal: (show: boolean) => void;
  paymentUrl: string;
};

export const ConfirmModal = ({ setShowModal, paymentUrl }: Props) => {
  const [isChecked, setChecked] = useState(false);
  const router = useRouter();
  const handlePaymentClick = () => router.push(paymentUrl);

  return (
    <Modal title={'Subscribe'} className={s.modal} onClose={() => setShowModal(false)}>
      <div>Auto-renewal will be enabled with this payment. You can disable it anytime in your profile settings</div>
      <div className={s.checkbox}>
        <Checkbox label={'Agree'} checked={isChecked} onChange={() => setChecked(!isChecked)} />
        <Button disabled={!isChecked} onClick={handlePaymentClick}>
          Ok
        </Button>
      </div>
    </Modal>
  );
};
