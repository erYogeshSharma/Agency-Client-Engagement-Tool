import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import ProjectPage from '@/pages/project/ProjectPage';
import AuthenticationPage from '@/pages/public/auth/Auth.page';
import { HomePage } from '@/pages/public/home/Home.page';
import Settings from '@/pages/settings/Settings';
import { useAuth } from '@/shared/hooks/userAuth';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const DashboardRoutes = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="/login" />
  );
};
export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/',
    element: <PublicRoute />,
    children: [{ path: '/*', element: <AuthenticationPage /> }],
  },
  {
    path: '/onboard',
    element: <ProtectedRoute />,
    children: [{ path: '', element: <DashboardPage /> }],
  },
  {
    path: '/',
    element: <DashboardRoutes />,
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'settings', element: <Settings /> },
      { path: 'projects', element: <ProjectPage /> },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
