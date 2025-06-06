'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { ContentPage } from '@/widgets/content-page/ContentPage';
import { GeneralInfo } from '@/features/profile/ui/settings/general-info/GeneralInfo';
import { Tabs, TabsContent, TabType } from '@internshipsamyrai44-ui-kit/components-lib';
import { Devices } from '@/features/profile/ui/settings/devices/Devices';
import { Payments } from '@/features/profile/ui/settings/payments/Payments';
import { AccountManagement } from '@/features/profile/ui/settings/account-management/AccountManagement';

export default function SettingsPage() {
  const t = useTranslations('Profile');
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialTab = searchParams.get('tab') || 'general-information';
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const tabs = useMemo<TabType[]>(
    () => [
      { title: t('GeneralInformation'), value: 'general-information' },
      { title: t('Devices'), value: 'devices' },
      { title: t('AccountManagement'), value: 'account-management' },
      { title: t('MyPayments'), value: 'my-payments' }
    ],
    [t]
  );
  const renderActiveSection = () => {
    switch (activeTab) {
      case 'devices':
        return <Devices />;
      case 'account-management':
        return <AccountManagement />;
      case 'my-payments':
        return <Payments />;
      case 'general-information':
      default:
        return <GeneralInfo />;
    }
  };
  const handleActiveTabChange = useCallback(
    (value: string) => {
      setActiveTab(value);
      router.push(`?tab=${value}`, { scroll: false });
    },
    [router]
  );
  useEffect(() => {
    setActiveTab(searchParams.get('tab') || 'general-information');
  }, [searchParams]);

  return (
    <>
      <ContentPage>
        <Tabs fullWidth tabs={tabs} defaultValue={activeTab} onValueChange={handleActiveTabChange}>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {renderActiveSection()}
            </TabsContent>
          ))}
        </Tabs>
      </ContentPage>
    </>
  );
}
