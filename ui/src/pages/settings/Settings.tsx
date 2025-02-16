import React, { useState } from 'react';
import { Box, Tabs, Text, useMantineTheme } from '@mantine/core';
import Appearance from './sections/Appearance';

/**
 * Basic info
 * palsn and billing
 * team
 * appearance
 * notifications
 * audit trail
 * integrations
 */
const tabs = [
  {
    title: 'Basic info',
    value: 'basic-info',
  },
  {
    title: 'Plans & billing',
    value: 'plan',
  },
  {
    title: 'Team',
    value: 'team',
  },
  {
    title: 'Appearance',
    value: 'appearance',
  },
  {
    title: 'Notifications',
    value: 'notifications',
  },
  {
    title: 'Audit trail',
    value: 'audit',
  },
  {
    title: 'Integrations',
    value: 'integrations',
  },
  {
    title: 'Organization',
    value: 'organization',
  },
];
const Settings = () => {
  const theme = useMantineTheme();
  function renderTabs() {
    const [activeTab, setActiveTab] = useState<string | null>('organization');
    return (
      <Tabs value={activeTab} onChange={setActiveTab} variant="default" defaultValue="organization">
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab key={tab.value} value={tab.value}>
              <Text size="sm" fw={600}>
                {tab.title}
              </Text>
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <Tabs.Panel value="appearance">
          <Appearance />
        </Tabs.Panel>
        <Text>{activeTab}</Text>
      </Tabs>
    );
  }
  return <Box>{renderTabs()}</Box>;
};

export default Settings;
