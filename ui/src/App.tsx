import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from '@/shared/config/routes/routes';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Router />
    </MantineProvider>
  );
}
