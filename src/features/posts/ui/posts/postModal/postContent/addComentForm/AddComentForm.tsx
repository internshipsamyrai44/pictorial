'use client';

import s from './AddComentForm.module.scss';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';

export default function AddComentForm() {
  return (
    <div className={s.addComent}>
      <input className={s.input} />
      <Button variant={'ghost'}>Publish</Button>
    </div>
  );
}
