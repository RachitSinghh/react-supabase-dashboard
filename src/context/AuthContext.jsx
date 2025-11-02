// Import necessary React hooks and functions:
// - createContext: Creates a new Context object for sharing data across components
// - useContext: Hook to consume/read context values in child components
// - useState: Hook to manage state within this component
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabase-client";

// Create a new Context object called AuthContext
// This creates a "container" that will hold authentication-related data
// Initially, it's empty (undefined by default)
// This context will be used to share auth state across your entire React app
const AuthContext = createContext();

// Export a Provider component that wraps your app and provides auth data to all children
// GOTCHA: There's a typo here - 'childern' should be 'children'
export const AuthContextProvider = ({ children }) => {
  // Create a state variable called 'session' with initial value of undefined
  // setSession is the function you'll call to update the session state
  // This will store user authentication data (like user info, tokens, etc.)
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    async function getInitialSession() {
      //   const {
      //     data: { session },
      //     error,
      //   } = await supabase.auth.getSession();

      //   if(error){
      //     console.error("Error getting session:", error)
      //     return;
      //   }

      //   getInitialSession();
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }

        console.log(data.session);
      } catch (error) {
        console.error("Error getting session: ", error.message);
      }
    }

    // listen for changes in auth state(.onAuthStateChange())

    supabase.auth.onAuthStateChange((_event, session) =>{
        setSession(session); 
        console.log('Session changed: ', session)
    })


    getInitialSession()
  }, []);


  const signInUser = async (email, password) =>{
    try{
      // supabase method
        const {data, error}= await supabase.auth.signInWithPassword({
          email: email.toLowerCase(),
          password: password,
        })
      // handle supabase error explicitly 

      if(error){
        console.log('Supabase sign-in error: ', error.message);
        return {success: false, error: error.message}; 
      }

      // success
      console.log('Supabase sign-in success:', data);
      return {success: true, data}
    }catch(error){
      // unexpected error
      console.error('Unexpected error during sign-in:', error.message);
      return {success: false, error: 'An unexpected error occured please try again'}
    }
  }

  // Return the Provider component that wraps all children
  // The Provider makes the 'value' prop available to all descendant components
  return (
    // AuthContext.Provider is what actually provides the context value to the component tree
    // value={{ session }} creates an object with the session state
    // GOTCHA: setSession is NOT included in the value, so child components can't update session
    // You probably want to include setSession here too!
    <AuthContext.Provider value={{ session, signInUser }}>
      {/* Render all child components passed to this provider */}
      {/* TYPO: 'childern' should be 'children' */}
      {children}
    </AuthContext.Provider>
  );
};

// Export a custom hook that makes it easy to consume the AuthContext
// This is a best practice - it simplifies using the context in other components
export const useAuth = () => {
  // useContext(AuthContext) reads the current value from the nearest AuthContext.Provider above in the tree
  // This returns the value object: { session }
  // Components calling useAuth() will get access to the session state
  return useContext(AuthContext);
};
