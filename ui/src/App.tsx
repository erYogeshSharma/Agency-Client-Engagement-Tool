import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/tiptap/styles.css';

import { useEffect, useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { Router } from '@/shared/config/routes/routes';
import { useAppSelector } from './app/hooks';
import { getTheme } from './theme';

export default function App() {
  const { colorScheme } = useAppSelector((state) => state.auth);
  const [theme, setTheme] = useState(getTheme(colorScheme));

  useEffect(() => {
    setTheme(getTheme(colorScheme));
  }, [colorScheme]);

  return (
    <MantineProvider theme={theme}>
      <Router />
    </MantineProvider>
  );
}
