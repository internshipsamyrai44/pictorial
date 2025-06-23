import { Messenger } from '@/features/messenger/ui/messenger';
import s from './page.module.scss';

export default function DirectPage() {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Messenger </h1>
      <Messenger userId={'123456789'} />
    </div>
  );
}
