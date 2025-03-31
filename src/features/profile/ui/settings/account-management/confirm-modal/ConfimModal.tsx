import s from './ConfirmModal.module.scss';
import { Button, Checkbox, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { useState } from 'react';

type Props = {
  // eslint-disable-next-line no-unused-vars
  setShowModal: (show: boolean) => void;
  handleSubscribe: () => void;
};

export const ConfirmModal = ({ setShowModal, handleSubscribe }: Props) => {
  const [isChecked, setChecked] = useState(false);

  return (
    <Modal title={'Subscribe'} className={s.modal} onClose={() => setShowModal(false)}>
      <div>Auto-renewal will be enabled with this payment. You can disable it anytime in your profile settings</div>
      <div className={s.checkbox}>
        <Checkbox label={'Agree'} checked={isChecked} onChange={() => setChecked(!isChecked)} />
        <Button disabled={!isChecked} onClick={handleSubscribe}>
          Ok
        </Button>
      </div>
    </Modal>
  );
};
