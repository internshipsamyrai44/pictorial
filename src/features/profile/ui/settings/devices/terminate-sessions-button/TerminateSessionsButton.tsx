import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';
import s from './TerminateSessionsButton.module.scss';

type TerminateSessionsButtonProps = {
  onTerminateAll: () => void;
  isLoading: boolean;
  hasOtherDevices: boolean;
};

export const TerminateSessionsButton = ({
  onTerminateAll,
  isLoading,
  hasOtherDevices
}: TerminateSessionsButtonProps) => {
  const t = useTranslations('Sessions');

  if (!hasOtherDevices) {
    return null;
  }

  return (
    <div className={s.terminateButtonContainer}>
      <Button variant="outlined" onClick={onTerminateAll} disabled={isLoading} className={s.terminateButton}>
        {t('TerminateAllOtherSessions')}
      </Button>
    </div>
  );
};
