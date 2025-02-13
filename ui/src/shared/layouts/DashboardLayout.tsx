import { useState } from 'react';
import {
  IconBriefcase,
  IconCalendar,
  IconChartBar,
  IconChevronRight,
  IconFileText,
  IconFingerprint,
  IconGauge,
  IconLogout,
  IconMessageCircle,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { AppShell, Burger, Group, NavLink, ScrollArea, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import UserMenu from '../components/UserMenu';
import { useAuth } from '../hooks/userAuth';

const navItems = [
  {
    icon: IconGauge,
    label: 'Dashboard',
    description: 'Overview of activities',
    href: '/dashboard',
  },
  { icon: IconUsers, label: 'Clients', description: 'Manage agency clients' },
  { icon: IconBriefcase, label: 'Projects', description: 'Client projects & tasks' },
  { icon: IconFileText, label: 'Approvals', description: 'Review & approve work' },
  { icon: IconCalendar, label: 'Schedule', description: 'Meetings & deadlines' },
  { icon: IconMessageCircle, label: 'Discussions', description: 'Client communications' },
  { icon: IconChartBar, label: 'Analytics', description: 'Insights & reports' },
  {
    icon: IconFingerprint,
    label: 'Security',
    rightSection: <IconChevronRight size={16} stroke={1.5} />,
  },
  {
    icon: IconSettings,
    label: 'Settings',
    description: 'Configure account & preferences',
    href: '/settings',
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}
export function DashboardLayout(props: DashboardLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const { logout } = useAuth();
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const items = navItems.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      variant="filled"
      label={<Text size="sm">{item.label}</Text>}
      //   description={item.description}
      //   rightSection={item.rightSection}
      leftSection={<item.icon size={16} stroke={2} />}
      onClick={() => {
        setActive(index);
        if (item.href) {
          navigate(item.href || '/');
        }
      }}
    />
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="sm"
    >
      <AppShell.Header>
        <Group justify="space-between" h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title c="blue" order={2}>
            CEngage
          </Title>
          <Group>
            <ColorSchemeToggle />
            <UserMenu />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        {/* <AppShell.Section>sd</AppShell.Section> */}
        <AppShell.Section grow component={ScrollArea}>
          {items}
        </AppShell.Section>
        <AppShell.Section>
          <NavLink
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
            label={<Text size="sm">Log Out</Text>}
            leftSection={<IconLogout size={16} stroke={2} />}
          />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{props.children}</AppShell.Main>
    </AppShell>
  );
}
