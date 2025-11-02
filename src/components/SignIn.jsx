import { useActionState } from "react";
import supabase from "../supabase-client";


const Signin = () => {

  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      // Action Logic
      const user = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      console.log(user);

      // Async operation
      const { error } = await supabase.auth.signInWithPassword(user);


      if(error){
        console.log("Error signing in:", error);
        return new Error("Failed to sign in. Please check your credentials");
      }

      // return error statrn
      return null;
    },
    null // InitalState
  );

  /**
  Challenge:
  * 1) Import the 'useActionState' hook
  * 2) Call the hook at the top level of the component, destructuring three values:
         - 'error' (state for error handling)
         - 'submitAction' (the form action function)
         - 'isPending' (loading state boolean)
  * 3) Pass two arguments to useActionState:
        - First argument: an async arrow function with 2 parameters
        - Second argument: initial state value of null
  * 4) Inside the async function, extract the email and password into variables
  * 5) Add the 'sumbmitAction' to your form's action prop
  */
  return (
    <>
      <h1 className="landing-header">Paper Like A Boss</h1>
      <div className="sign-form-container">
        <form
          action={submitAction}
          aria-label="Sign in form"
          aria-describedby="form-description"
        >
          <div id="form-description" className="sr-only">
            Use this form to sign in to your account. Enter your email and
            password.
          </div>

          <h2 className="form-title">Sign in</h2>
          <p>
            Don't have an account yet?{' '}
            {/*<Link className="form-link">*/}
            Sign up
            {/*</Link>*/}
          </p>

          <label htmlFor="email">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            placeholder=""
            required
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby="email-hint"
            disabled={isPending}
          />

          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            id="password"
            placeholder=""
            required
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby="passowrd-hint"
            disabled={isPending}
          />

          <button
            type="submit"
            className="form-button"
          //className=
          //aria-busy=
          >
            {/*'Signing in...' when pending*/}
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Error message */}
          {error && (
            <div role="alert" className="error-message">
              {error.message}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Signin;