import { createBrowserRouter } from "react-router-dom"
import Header from "./components/Header";
import Dashboard from "./routes/Dashboard";
import SignIn from "./components/SignIn";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <SignIn />
    },
    {
        path: "/dashboard",
        element: (
            <>
            <Header />
            <Dashboard />
            </>
        )
    }
]);