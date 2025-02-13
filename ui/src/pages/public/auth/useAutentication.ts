import {
  useForgotPasswordMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useSignUpMutation,
} from '@/app/services/auth.service';

export type AuthAction = 'login' | 'register' | 'forgot-password' | 'reset-password';

export const useHandleAuth = () => {
  const [login, loginState] = useLoginMutation();
  const [signUp, signUpState] = useSignUpMutation();
  const [forgotPassword, forgotPasswordState] = useForgotPasswordMutation();
  const [resetPassword, resetPasswordState] = useResetPasswordMutation();

  // Combine all states dynamically
  const getState = (action: AuthAction) => {
    return {
      login: loginState,
      register: signUpState,
      'forgot-password': forgotPasswordState,
      'reset-password': resetPasswordState,
    }[action];
  };

  // Handle authentication action dynamically
  const handleAuth = async (action: AuthAction, data: any) => {
    const mutation = {
      login,
      register: signUp,
      'forgot-password': forgotPassword,
      'reset-password': resetPassword,
    }[action];

    const state = getState(action);
    state.reset(); // Reset previous errors

    try {
      const response = await mutation(data).unwrap();
      return response;
    } catch (err) {
      return null;
    }
  };

  const resetErrors = () => {
    loginState.reset();
    signUpState.reset();
    forgotPasswordState.reset();
    resetPasswordState.reset();
  };

  return {
    handleAuth,
    isLoading:
      loginState.isLoading ||
      signUpState.isLoading ||
      forgotPasswordState.isLoading ||
      resetPasswordState.isLoading,
    isError:
      loginState.isError ||
      signUpState.isError ||
      forgotPasswordState.isError ||
      resetPasswordState.isError,
    error:
      loginState.error ||
      signUpState.error ||
      forgotPasswordState.error ||
      resetPasswordState.error,
    data:
      loginState.data || signUpState.data || forgotPasswordState.data || resetPasswordState.data,
    resetErrors,
  };
};
