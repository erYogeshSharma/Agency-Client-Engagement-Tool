import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="lg"
      variant="transparent"
      aria-label="Settings"
    >
      {colorScheme === 'dark' ? (
        <IconMoonStars style={{ width: '70%', height: '70%' }} stroke={1.5} />
      ) : (
        <IconSun style={{ width: '70%', height: '70%' }} stroke={1.5} />
      )}
    </ActionIcon>
  );
}
