import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) =>{
    const { session } = useAuth();

    if(session == undefined) {
        return <div>Loading... </div>
    }

    // if no session - navigate to .signin
    // if session, render children 

    return session ? <>{children}</> : <Navigate to="/signin" /> ;
}

export default ProtectedRoute

// This is a route guard component that controls access to protected pages in your React application based on authentication status.

// Checks Authentication State: Uses the useAuth() hook to get the current user's session
// Handles Loading State: If session is undefined (still loading), shows a "Loading..." message
