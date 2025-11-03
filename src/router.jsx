import { createBrowserRouter } from "react-router-dom"
import Header from "./components/Header";
import Dashboard from "./routes/Dashboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <SignIn />
    },
    {
        path: "/signup", 
        element: <SignUp />
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