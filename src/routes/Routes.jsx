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
          children: [
            {
              element: (
                <ProtectedRoutes roles={["Manager"]}>
                  <ShowTimeList />
                </ProtectedRoutes>
              ),
              index: true,
            },
            {
              path: ":id",
              children: [
                {
                  path: "tickets",
                  element: (
                    <ProtectedRoutes roles={["Manager"]}>
                      <AddTicket />
                    </ProtectedRoutes>
                  ),
                },
                {
                  index: true,
                  element: (
                    <ProtectedRoutes roles={["Manager"]}>
                      <ShowTimeDetail />
                    </ProtectedRoutes>
                  ),
                },
              ],
            },
          ],
        },
        {
          path: "theaters",
          children: [
            {
              index: true,
              element: (
                <ProtectedRoutes roles={["Manager"]}>
                  <TheaterList />
                </ProtectedRoutes>
              ),
            },
            // {
            //   path: ":id",
            //   element: (
            //     <ProtectedRoutes roles={["Manager"]}>
            //       <RoomList />
            //     </ProtectedRoutes>
            //   ),
            // },
          ],
        },
        {
          path: "payments",
          element: (
            <ProtectedRoutes roles={["Manager", "Admin"]}>
              <PaymentList />
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
          path: "companies",
          element: (
            <ProtectedRoutes roles={["Admin"]}>
              <CompanyList />
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
const AddTicket = Loading(lazy(() => import("pages/AddTicket")));

const Analytics = Loading(lazy(() => import("pages/Analytics")));
const TheaterList = Loading(lazy(() => import("pages/TheaterList")));
const PaymentList = Loading(lazy(() => import("pages/PaymentList")));
const CompanyList = Loading(lazy(() => import("pages/CompanyList")));
const ShowTimeDetail = Loading(lazy(() => import("pages/ShowTimeDetail")));
