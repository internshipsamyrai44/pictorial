import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEventHandler } from 'react';

import Portal, { createContainer } from '../portal/Portal';

import s from './Modal.module.scss';
import smallCross from '@/public/icons/smallCross.svg';
import Image from 'next/image';

const MODAL_CONTAINER_ID = 'modal-container-id';

type Props = {
  title: string;
  onClose?: () => void;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

const Modal = (props: Props) => {
  const { title, onClose, children, className } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    createContainer({ id: MODAL_CONTAINER_ID });
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleWrapperClick = (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof Node && rootRef.current === target) {
        onClose?.();
      }
    };
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('click', handleWrapperClick);
    window.addEventListener('keydown', handleEscapePress);

    return () => {
      window.removeEventListener('click', handleWrapperClick);
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, [onClose]);

  const handleClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return isMounted ? (
    <Portal id={MODAL_CONTAINER_ID}>
      <div className={s.wrap} ref={rootRef} data-testid="wrap">
        <div className={s.content}>
          <div className={s.header}>
            <p className={s.title}>{title}</p>
            <Image
              className={s.closeButton}
              onClick={handleClose}
              src={smallCross}
              width={14}
              height={14}
              alt={'Small cross'}
              data-testid="modal-close-button"
            />
          </div>
          <div className={className}>{children}</div>
        </div>
      </div>
    </Portal>
  ) : null;
};

export default Modal;
