import React, { useState } from 'react';
import { IconCheck, IconInfoCircle } from '@tabler/icons-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  Anchor,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useInterval } from '@mantine/hooks';
import { useHandleAuth } from '../useAutentication';
import { GoogleButton } from './GoogleButton';

function getFormConfig(formType: string) {
  const config = {
    title: '',
    subtitle: '',
    submitText: '',
    subtitleLink: '',
  };
  switch (formType) {
    case 'login':
      config.title = 'Welcome back!';
      config.subtitle = 'Do not have an account?';
      config.subtitleLink = 'Register';
      config.submitText = 'Login';
      break;
    case 'register':
      config.title = 'Create account';
      config.subtitle = 'Already have an account?';
      config.subtitleLink = 'Login';
      config.submitText = 'Register';
      break;
    case 'forgot-password':
      config.title = 'Forgot password';
      config.subtitle = 'Remembered your password?';
      config.subtitleLink = 'Login';
      config.submitText = 'Submit';
      break;
    case 'reset-password':
      config.title = 'Reset password';
      config.subtitle = 'Remembered your password?';
      config.subtitleLink = 'Login';
      config.submitText = 'Submit';
      break;
    default:
      break;
  }
  return config;
}
const Auth = () => {
  const { handleAuth, error, isError, isLoading, resetErrors, data } = useHandleAuth();
  const [formConfig, setFormConfig] = React.useState<any>({});
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const formType = location.pathname.split('/')[1];
  const isSignUp = location.pathname.includes('register');
  const token = params.token;

  const [redirectSeconds, setRedirectSeconds] = useState(3);
  const interval = useInterval(() => setRedirectSeconds((s) => s - 1), 1000);

  React.useEffect(() => {
    if (redirectSeconds === 0) {
      navigate('/login');
      return interval.stop();
    }
  }, [redirectSeconds]);

  React.useEffect(() => {
    setFormConfig(getFormConfig(formType));
    if (formType === 'reset-password') {
      if (!token) {
        navigate('/forgot-password');
      }

      if (data && 'message' in data) {
        interval.start();
      }
    }
  }, [formType, data]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      full_name: '',
      password: '',
      confirmPassword: '',
      token: '',
    },

    validate: (values) => {
      if (formType === 'register') {
        return {
          full_name:
            values.full_name.trim().length < 2 ? 'Name must include at least 2 characters' : null,
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
          password:
            values.password.length < 6 ? 'Password must include at least 6 characters' : null,
        };
      }

      if (formType === 'login') {
        return {
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
          password:
            values.password.length < 6 ? 'Password must include at least 6 characters' : null,
        };
      }

      if (formType === 'forgot-password') {
        return {
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
        };
      }
      if (formType === 'reset-password') {
        return {
          password:
            values.password.length < 6 ? 'Password must include at least 6 characters' : null,
          confirmPassword:
            values.confirmPassword !== values.password ? 'Passwords do not match' : null,
        };
      }
      return {};
    },
  });

  function changeFormType(type: string) {
    resetErrors();
    form.reset();
    navigate(type);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.onSubmit((values) => {
      if (token) {
        values.token = token;
      }
      handleAuth(formType as any, values);
    })();
  }

  return (
    <Stack
      justify="center"
      align="center"
      bg="var(--mantine-color-dark-2)"
      style={{ height: '100vh' }}
    >
      <Container size={400} my={40}>
        <Paper w={400} withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleSubmit}>
            <Stack gap="sm">
              <Box>
                <Title ta="center">{formConfig?.title}</Title>
                {formType !== 'reset-password' && formType !== 'forgot-password' && (
                  <Box>
                    <Group grow mb="md" mt="md">
                      <GoogleButton radius="xl">Continue with Google</GoogleButton>
                      {/* <TwitterButton radius="xl">Twitter</TwitterButton> */}
                    </Group>
                    <Divider label="Or continue with email" labelPosition="center" />
                  </Box>
                )}
              </Box>
              {isSignUp && (
                <TextInput
                  label="Full Name"
                  placeholder="John Doe"
                  key={form.key('full_name')}
                  {...form.getInputProps('full_name')}
                />
              )}
              {formType !== 'reset-password' && (
                <TextInput
                  label="Email"
                  placeholder="your@email.com"
                  key={form.key('email')}
                  {...form.getInputProps('email')}
                />
              )}
              {formType !== 'forgot-password' && (
                <PasswordInput
                  label={formType === 'reset-password' ? 'New Password' : 'Password'}
                  placeholder="Your password"
                  key={form.key('password')}
                  {...form.getInputProps('password')}
                />
              )}
              <div>
                {formType === 'reset-password' && (
                  <PasswordInput
                    label="Confirm password"
                    placeholder="Confirm your password"
                    key={form.key('confirmPassword')}
                    {...form.getInputProps('confirmPassword')}
                  />
                )}
                {formType === 'login' && (
                  <Group justify="space-between">
                    <Checkbox label="Remember me" />
                    <Anchor
                      type="button"
                      component="button"
                      size="sm"
                      onClick={() => changeFormType('/forgot-password')}
                    >
                      Forgot password?
                    </Anchor>
                  </Group>
                )}
              </div>
              {isError && (
                <Alert
                  variant="light"
                  p={4}
                  color="red"
                  title={
                    error && 'data' in error
                      ? JSON.stringify((error.data as { detail?: string })?.detail)
                      : 'An unknown error occurred'
                  }
                  icon={<IconInfoCircle />}
                />
              )}
              {(formType === 'forgot-password' || formType === 'reset-password') &&
                data &&
                'message' in data && (
                  <Alert
                    variant="light"
                    p={4}
                    color="green"
                    title={data.message}
                    icon={<IconCheck />}
                  />
                )}
              {formType === 'reset-password' && data && 'message' in data && (
                <Text size="sm">Redirecting to login in {redirectSeconds} Seconds.</Text>
              )}
              <Group justify="space-between">
                <Anchor
                  type="button"
                  size="xs"
                  component="button"
                  c="dimmed"
                  onClick={() => changeFormType(isSignUp ? '/login' : '/register')}
                >
                  {formConfig?.subtitle} {formConfig?.subtitleLink}
                </Anchor>
                <Button
                  size="sm"
                  type="submit"
                  radius="xl"
                  loading={isLoading}
                  loaderProps={{ type: 'dots' }}
                >
                  {formConfig?.submitText}
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Stack>
  );
};

export default Auth;
