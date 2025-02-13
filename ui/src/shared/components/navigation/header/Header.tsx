import {
  IconBell,
  IconBrand4chan,
  IconChartBar,
  IconChevronDown,
  IconClipboardCheck,
  IconMessageDots,
  IconUsers,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAppDispatch } from '@/app/hooks';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { authActions } from '@/features/auth/auth.slice';
import { useAuth } from '@/shared/hooks/userAuth';
import classes from './Header.module.css';

const mockdata = [
  {
    icon: IconBrand4chan,
    title: 'White-Label Solution',
    description: 'Customize the platform with your agency’s branding, logos, and custom domains.',
  },
  {
    icon: IconUsers,
    title: 'Multi-Client Management',
    description: 'Easily manage multiple clients, assign tasks, and track project progress.',
  },
  {
    icon: IconMessageDots,
    title: 'Live Collaboration',
    description: 'Real-time task updates, shared timelines, and instant notifications.',
  },
  {
    icon: IconClipboardCheck,
    title: 'Task Management',
    description: 'Create, assign, and track tasks with status labels and version history.',
  },
  {
    icon: IconChartBar,
    title: 'Analytics & Insights',
    description: 'Monitor task completion rates, client engagement, and team productivity.',
  },
  {
    icon: IconBell,
    title: 'Feedback & Approvals',
    description: 'Clients can review, approve, or provide feedback on deliverables.',
  },
];

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useAuth();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.primaryColor} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {/* <Logo /> */}

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link}>
              Home
            </a>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown size={16} color={theme.primaryColor} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Seamless Collaboration
                      </Text>
                      <Text size="xs" c="dimmed">
                        Manage tasks, approvals, and client feedback in one place with real-time
                        updates.
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>

          {isAuthenticated ? (
            <Box>
              <Group visibleFrom="sm">
                <Button variant="default" onClick={() => dispatch(authActions.logout())}>
                  Log out
                </Button>
                <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
                <ColorSchemeToggle />
              </Group>
            </Box>
          ) : (
            <Box>
              <Group visibleFrom="sm" align="center">
                <Button variant="default" onClick={() => navigate('/login')}>
                  Log in
                </Button>
                <Button onClick={() => navigate('/register')}>Sign up</Button>
                <ColorSchemeToggle />
              </Group>
            </Box>
          )}

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.colors.blue[6]} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" />

          {isAuthenticated ? (
            <Box>
              <Group justify="center" grow pb="xl" px="md">
                <Button variant="default" onClick={() => dispatch(authActions.logout())}>
                  Log out
                </Button>
                <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
              </Group>
            </Box>
          ) : (
            <Box>
              <Group justify="center" grow pb="xl" px="md">
                <Button variant="default" onClick={() => navigate('/login')}>
                  Log in
                </Button>
                <Button onClick={() => navigate('/register')}>Sign up</Button>
              </Group>
            </Box>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
