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
              element: (
                <ProtectedRoutes roles={["Manager"]}>
                  <ShowTimeDetail />
                </ProtectedRoutes>
              ),
            },
          ],
        },
        // {
        //   path: "tickets",
        //   children: [
        //     {
        //       element: (
        //         <ProtectedRoutes roles={["Manager"]}>
        //           <TicketList />
        //         </ProtectedRoutes>
        //       ),
        //       index: true,
        //     },
        //     {
        //       path: "add/:showtimeId",
        //       element: (
        //         <ProtectedRoutes roles={["Manager"]}>
        //           <AddTicket />
        //         </ProtectedRoutes>
        //       ),
        //     },
        //     {
        //       path: ":id",
        //       element: (
        //         <ProtectedRoutes roles={["Manager"]}>
        //           <ShowTimeDetail />
        //         </ProtectedRoutes>
        //       ),
        //     },
        //   ],
        // },
        {
          path: "theaters",
          children: [
            {
              index: true,
              element: (
                <ProtectedRoutes roles={["Manager", "Admin"]}>
                  <TheaterList />
                </ProtectedRoutes>
              ),
            },
            {
              path: ":id",
              element: (
                <ProtectedRoutes roles={["Manager", "Admin"]}>
                  <TheaterDetail />
                </ProtectedRoutes>
              ),
            },
          ],
        },
        {
          path: "orders",
          children: [
            {
              index: true,
              element: (
                <ProtectedRoutes roles={["Manager", "Admin"]}>
                  <OrderList />
                </ProtectedRoutes>
              ),
            },
            {
              path: ":id",
              element: (
                <ProtectedRoutes roles={["Manager", "Admin"]}>
                  <OrderDetail />
                </ProtectedRoutes>
              ),
            },
          ],
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
          path: "customers",
          element: (
            <ProtectedRoutes roles={["Admin"]}>
              <CustomerList />
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

const Login = Loading(lazy(() => import("pages/auth/Login")));

const MovieList = Loading(lazy(() => import("pages/movie/MovieList")));
const MovieDetails = Loading(lazy(() => import("pages/movie/MovieDetails")));
const AddMovie = Loading(lazy(() => import("pages/movie/AddMovie")));
const Profile = Loading(lazy(() => import("pages/profile/Profile")));
const UserList = Loading(lazy(() => import("pages/account/UserList")));
const NotFound = Loading(lazy(() => import("pages/message/NotFound")));
const PermissionDenied = Loading(
  lazy(() => import("pages/message/PermissionDenied"))
);
const Dashboard = Loading(lazy(() => import("pages/dashboard/Dashboard")));
const RoomList = Loading(lazy(() => import("pages/room/RoomList")));
const ShowTimeList = Loading(lazy(() => import("pages/showtime/ShowTimeList")));
const AddTicket = Loading(lazy(() => import("pages/ticket/AddTicket")));
const TicketList = Loading(lazy(() => import("pages/ticket/TicketList")));
const Analytics = Loading(lazy(() => import("pages/analytics/Analytics")));
const TheaterList = Loading(lazy(() => import("pages/theater/TheaterList")));
const TheaterDetail = Loading(
  lazy(() => import("pages/theater/TheaterDetail"))
);
const OrderList = Loading(lazy(() => import("pages/order/OrderList")));
const OrderDetail = Loading(lazy(() => import("pages/order/OrderDetail")));
const CompanyList = Loading(lazy(() => import("pages/company/CompanyList")));
const ShowTimeDetail = Loading(
  lazy(() => import("pages/showtime/ShowTimeDetail"))
);
const CustomerList = Loading(lazy(() => import("pages/account/CustomerList")));
