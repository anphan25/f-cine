import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import {
  MainLayout,
  AuthLayout,
  DashboardLayout,
  MessageLayout,
} from 'layouts';
import LoadingPage from '../components/loading/LoadingPage';
import ProtectedRoutes from './ProtectedRoutes';

const Loading = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/login',
      element: <Login />,
      // children: [
      //   {
      //     path: 'login',
      //     element: <Login />,
      //   },
      //   { element: <Navigate to="login" replace />, index: true },
      // ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <Home />, index: true },
        { path: 'movies/:type', element: <MovieList /> },
        { path: 'movie/:id', element: <MovieDetails /> },
        {
          path: 'profile',
          element: (
            <ProtectedRoutes roles={['user']}>
              <Profile />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'payment',
          element: (
            <ProtectedRoutes roles={['user']}>
              <Payment />
            </ProtectedRoutes>
          ),
        },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoutes roles={['admin', 'manager']}>
          <DashboardLayout />
        </ProtectedRoutes>
      ),
      children: [
        { element: <Dashboard />, index: true },
        { path: 'movies', element: <MovieList /> },
      ],
    },
    {
      path: '*',
      element: <MessageLayout />,
      children: [
        { path: 'not-found', element: <NotFound /> },
        { path: 'permission-denied', element: <PermissionDenied /> },
        { path: '*', element: <Navigate to="/not-found" replace /> },
      ],
    },
  ]);
}

const Login = Loading(lazy(() => import('pages/Login')));
const Home = Loading(lazy(() => import('../pages/Home')));
const MovieList = Loading(lazy(() => import('../pages/MovieList')));
const MovieDetails = Loading(lazy(() => import('../pages/MovieDetails')));
const Profile = Loading(lazy(() => import('../pages/Profile')));
const NotFound = Loading(lazy(() => import('../pages/NotFound')));
const PermissionDenied = Loading(
  lazy(() => import('../pages/PermissionDenied'))
);
const Dashboard = Loading(lazy(() => import('../pages/Dashboard')));
const Payment = Loading(lazy(() => import('../pages/Payment')));
