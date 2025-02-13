export function getFormConfig(formType: string) {
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
