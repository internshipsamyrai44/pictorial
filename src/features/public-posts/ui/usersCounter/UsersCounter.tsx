import { Card } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './UsersCounter.module.scss';
import { useTranslations } from 'next-intl';

type Props = {
  totalUsers: number;
};

export default function UsersCounter({ totalUsers }: Props) {
  const t = useTranslations('PublicPosts');
  const totalUsersArr = totalUsers.toString().padStart(6, '0').split('');

  return (
    <Card className={s.container}>
      <span className={s.userStats}>{t('RegisteredUsers')}</span>
      <Card className={s.totalUserContainer}>
        {totalUsersArr.map((unit, index) => {
          return (
            <div className={s.unitContainer} key={index}>
              <span className={s.unit}>{unit}</span>
            </div>
          );
        })}
      </Card>
    </Card>
  );
}
