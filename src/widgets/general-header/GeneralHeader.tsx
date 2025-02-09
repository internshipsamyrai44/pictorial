'use client';

import Link from 'next/link';
import s from './GeneralHeader.module.scss';
import {
  Button,
  FlagRussiaIcon,
  FlagUnitedKingdomIcon,
  Select,
  SelectItem
} from '@internshipsamyrai44-ui-kit/components-lib';

type GeneralHeaderProps = {
  isAuth: boolean;
};

export const GeneralHeader = ({ isAuth = false }: GeneralHeaderProps) => (
  <header className={s.wrapper}>
    <div className={s.container}>
      <Link href="/" className={s.logo}>
        Inctagram
      </Link>
      <div className={s.notificationContainer}>
        <SelectTranslate />
        {!isAuth && <HeaderButton />}
      </div>
    </div>
  </header>
);

const HeaderButton = () => (
  <div className={s.buttonContainer}>
    <Button className={s.logIn} asChild variant="ghost">
      <Link href="/auth/login">Log in</Link>
    </Button>
    <Button asChild variant="primary" className={s.signUp}>
      <Link href="/auth/signup">Sign up</Link>
    </Button>
  </div>
);

const SelectTranslate = () => (
  <div className={s.select}>
    <Select defaultValue="en">
      <SelectItem value="en">
        <div className={s.selectValue}>
          <FlagUnitedKingdomIcon />
          <span>English</span>
        </div>
      </SelectItem>
      <SelectItem value="ru">
        <div className={s.selectValue}>
          <FlagRussiaIcon />
          <span>Русский</span>
        </div>
      </SelectItem>
    </Select>
  </div>
);
