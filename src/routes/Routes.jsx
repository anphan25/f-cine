import { Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { DashboardLayout, MessageLayout } from "layouts";
import LoadingPage from "components/loading/LoadingPage";
import ProtectedRoutes from "./ProtectedRoutes";
import AuthRoutes from "./AuthRoutes";

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
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <AuthRoutes>
          <DashboardLayout />
        </AuthRoutes>
      ),
      children: [
        {
          element: (
            <ProtectedRoutes roles={["Manager", "Admin"]}>
              <Dashboard />
            </ProtectedRoutes>
          ),
          index: true,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoutes roles={["Manager", "Admin"]}>
              <Profile />
            </ProtectedRoutes>
          ),
        },
        {
          path: "showtimes",
          element: (
            <ProtectedRoutes roles={["Manager"]}>
              <Outlet />
            </ProtectedRoutes>
          ),
          children: [
            {
              index: true,
              element: <ShowTimeList />,
            },
            {
              path: "add",
              element: <AddShowTime />,
            },
          ],
        },
        {
          path: "rooms",
          element: (
            <ProtectedRoutes roles={["Manager"]}>
              <RoomList />
            </ProtectedRoutes>
          ),
        },
        {
          path: "analytics",
          element: (
            <ProtectedRoutes roles={["Manager", "Admin"]}>
              <Analytics />
            </ProtectedRoutes>
          ),
        },
        {
          path: "users",
          element: (
            <ProtectedRoutes roles={["Admin"]}>
              <UserList />
            </ProtectedRoutes>
          ),
        },
        {
          path: "movies",
          element: (
            <ProtectedRoutes roles={["Admin"]}>
              <Outlet />
            </ProtectedRoutes>
          ),
          children: [
            {
              index: true,
              element: <MovieList />,
            },
            {
              path: ":id",
              element: <MovieDetails />,
            },
            {
              path: "add",
              element: <AddMovie />,
            },
          ],
        },
        {
          path: "theaters",
          element: (
            <ProtectedRoutes roles={["Admin"]}>
              <TheaterList />
            </ProtectedRoutes>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <MessageLayout />,
      children: [
        { path: "not-found", element: <NotFound /> },
        { path: "permission-denied", element: <PermissionDenied /> },
        { path: "*", element: <Navigate to="/not-found" replace /> },
      ],
    },
  ]);
}

const Login = Loading(lazy(() => import("pages/Login")));

const MovieList = Loading(lazy(() => import("pages/MovieList")));
const MovieDetails = Loading(lazy(() => import("pages/MovieDetails")));
const AddMovie = Loading(lazy(() => import("pages/AddMovie")));

const Profile = Loading(lazy(() => import("pages/Profile")));
const UserList = Loading(lazy(() => import("pages/UserList")));
const NotFound = Loading(lazy(() => import("pages/NotFound")));
const PermissionDenied = Loading(lazy(() => import("pages/PermissionDenied")));
const Dashboard = Loading(lazy(() => import("pages/Dashboard")));
const RoomList = Loading(lazy(() => import("pages/RoomList")));

const ShowTimeList = Loading(lazy(() => import("pages/ShowTimeList")));
const AddShowTime = Loading(lazy(() => import("pages/AddShowTime")));

const Analytics = Loading(lazy(() => import("pages/Analytics")));
const TheaterList = Loading(lazy(() => import("pages/TheaterList")));
