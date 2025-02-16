import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { useAppDispatch } from '@/app/hooks';
import { authActions } from '@/features/auth/auth.slice';

export function ColorSchemeToggle() {
  const dispatch = useAppDispatch();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => {
        toggleColorScheme();
        dispatch(authActions.setColorScheme(colorScheme === 'dark' ? 'light' : 'dark'));
      }}
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
