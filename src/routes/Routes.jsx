import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { MainLayout } from 'layouts/MainLayout';
import LoadingPage from 'components/loading/LoadingPage';
import ProtectedRoutes from './ProtectedRoutes';
import { AuthLayout } from 'layouts/AuthLayout';

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
      path: '/auth',
      element: <AuthLayout />,
      children: [
        {
          path: 'login',
          element: <Login />,
        },
        { element: <Navigate to="login" replace />, index: true },
      ],
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
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          ),
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: '/404',
      element: <NotFound />,
    },
  ]);
}

const Login = Loading(lazy(() => import('pages/Login')));
const Home = Loading(lazy(() => import('pages/Home')));
const MovieList = Loading(lazy(() => import('pages/MovieList')));
const MovieDetails = Loading(lazy(() => import('pages/MovieDetails')));
const Profile = Loading(lazy(() => import('pages/Profile')));
const NotFound = Loading(lazy(() => import('pages/NotFound')));
