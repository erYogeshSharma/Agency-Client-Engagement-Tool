import { useState } from 'react';
import {
  IconBriefcase,
  IconCalendar,
  IconChartBar,
  IconChevronRight,
  IconFileText,
  IconFingerprint,
  IconGauge,
  IconLayoutKanban,
  IconLogout,
  IconMessageCircle,
  IconSearch,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import {
  AppShell,
  Avatar,
  Divider,
  Flex,
  Group,
  Input,
  NavLink,
  ScrollArea,
  Space,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import PageTitle from '../components/PageTitle';
import { useAuth } from '../hooks/userAuth';

const navItems = [
  {
    icon: IconGauge,
    label: 'Dashboard',
    description: 'Overview of activities',
    href: '/dashboard',
  },
  { icon: IconUsers, label: 'Clients', description: 'Manage agency clients' },
  {
    icon: IconBriefcase,
    label: 'Projects',
    description: 'Client projects & tasks',
    href: '/projects',
  },
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

/**
 * text primary : #181D27 primary
 * dimmed #717680 icons
 * navtitle #414651 nav title
 * #535862 subtitle
 *
 * light card : #FAFAFA
 * DIVIDER : #D5D7DA
 *#DEE2E6
 *
 *
 *
 *
 */

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout(props: DashboardLayoutProps) {
  const { user } = useAuth();
  const [opened, { toggle }] = useDisclosure();
  const { logout } = useAuth();
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const items = navItems.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      variant="light"
      style={{ borderRadius: 4 }}
      label={
        <Text size="sm" fw={600}>
          {item.label}
        </Text>
      }
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
      // header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="sm"
    >
      {/* <AppShell.Header>
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
      </AppShell.Header> */}
      <AppShell.Navbar p="xs">
        {/* <AppShell.Section>sd</AppShell.Section> */}
        <AppShell.Section grow component={ScrollArea}>
          <Flex align="center" gap={3} mt={5} mb={10}>
            <Flex
              bg="indigo"
              c="white"
              h={32}
              w={32}
              p={6}
              align="center"
              justify="center"
              style={{
                borderRadius: '50%',
              }}
            >
              <IconLayoutKanban type="light" />
            </Flex>

            <Text size="xl" fw={700} style={{ marginLeft: 5 }}>
              Project Pulse
            </Text>
          </Flex>
          <Space h="xs" />
          <Input
            leftSection={<IconSearch size={16} stroke={2} />}
            radius="md"
            size="xs"
            placeholder="Search"
          />
          <Space h="xs" />
          {items}
          <ColorSchemeToggle />
        </AppShell.Section>
        <AppShell.Section>
          <Group p="xs">
            <Avatar src="https://picsum.photos/id/237/200/300" radius="xl" size={40}>
              {user?.full_name?.charAt(0) || 'U'}
            </Avatar>
            <div>
              <Text size="sm" fw={600} truncate="end">
                {user?.full_name}
              </Text>
              <Text size="xs" c="dimmed" truncate="end">
                {user?.email}
              </Text>
            </div>
          </Group>
          <Divider />
          <NavLink
            variant="light"
            style={{ borderRadius: 4 }}
            label={
              <Text size="sm" c="text.5" fw={600}>
                Log Out
              </Text>
            }
            leftSection={<IconLogout size={16} stroke={2} />}
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <Stack>
          <PageTitle>{navItems[active].label}</PageTitle>
          {props.children}
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
