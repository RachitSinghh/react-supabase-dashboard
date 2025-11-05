import { createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./routes/Dashboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import RootRedirect from "./routes/RootRedirect";
import ProtectedRoute from "./components/ProtectedRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Header />
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);
