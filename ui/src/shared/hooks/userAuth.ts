import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { authActions } from '@/features/auth/auth.slice';

export const useAuth = () => {
  const { user } = useAppSelector((state) => state.auth);
  const isAuthenticated = !!user?.email;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function logout() {
    navigate('/');
    dispatch(authActions.logout());
  }

  return useMemo(() => ({ user, isAuthenticated, logout }), [user]);
};
