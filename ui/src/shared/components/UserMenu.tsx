import { IconLogout, IconSettings } from '@tabler/icons-react';
import { Avatar, Menu, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useAuth } from '../hooks/userAuth';

export default function UserMenu() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { user, logout } = useAuth();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar bg={colorScheme === 'dark' ? theme.colors.grape[4] : theme.colors.grape[1]}>
          {' '}
          <Text>
            {user?.full_name
              .split(' ')
              .map((i) => i[0].toUpperCase())
              .join('')}{' '}
          </Text>
        </Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>

        <Menu.Divider />

        <Menu.Item onClick={logout} leftSection={<IconLogout size={14} />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
