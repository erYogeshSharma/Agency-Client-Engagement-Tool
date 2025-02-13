import { Box, Button, Container, Text, Title, useMantineTheme } from '@mantine/core';
import { Header } from '@/shared/components/navigation/header/Header';
import { Dots } from './Dots';
import { FooterLinks } from './Footer';
import classes from './HeroText.module.css';

export function HomePage() {
  const theme = useMantineTheme();
  return (
    <Box>
      <Header />
      <Container className={classes.wrapper} size={1400}>
        <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
        <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

        <div className={classes.inner}>
          <Title className={classes.title}>
            Seamless{' '}
            <Text component="span" className={classes.highlight} c={theme.primaryColor} inherit>
              agency-client collaboration
            </Text>{' '}
            made simple
          </Title>

          <Container p={0} size={600}>
            <Text size="lg" c="dimmed" className={classes.description}>
              A white-label solution to streamline project management, approvals, and live
              collaboration—all under your agency's brand.
            </Text>
          </Container>

          <div className={classes.controls}>
            <Button className={classes.control} size="lg" variant="default" color="gray">
              Book a Demo
            </Button>
            <Button className={classes.control} size="lg">
              Get Started
            </Button>
          </div>
        </div>
      </Container>
      <FooterLinks />
    </Box>
  );
}
