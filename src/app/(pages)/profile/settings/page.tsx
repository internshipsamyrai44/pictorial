'use client';

import { ContentPage } from '@/widgets/content-page/ContentPage';
import { GeneralInfo } from '@/features/profile/ui/settings/general-info/GeneralInfo';
import React, { useCallback, useMemo, useState } from 'react';
import { Tabs, TabsContent, TabType } from '@internshipsamyrai44-ui-kit/components-lib';
import { Devices } from '@/features/profile/ui/settings/devices/Devices';
import { Payments } from '@/features/profile/ui/settings/payments/Payments';
import { AccountManagement } from '@/features/profile/ui/settings/account-management/AccountManagement';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<string>('general-information');
  const tabs = useMemo<TabType[]>(
    () => [
      { title: 'General information', value: 'general-information' },
      { title: 'Devices', value: 'devices' },
      { title: 'Account Management', value: 'account-management' },
      { title: 'My payments', value: 'my-payments' }
    ],
    []
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
  const handleActiveTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);
  return (
    <ContentPage>
      <Tabs fullWidth tabs={tabs} defaultValue={activeTab} onValueChange={handleActiveTabChange}>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {renderActiveSection()}
          </TabsContent>
        ))}
      </Tabs>
    </ContentPage>
  );
}
