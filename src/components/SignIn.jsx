import { useActionState } from "react";
import supabase from "../supabase-client";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      // Action Logic

      const email = formData.get("email");
      const password = formData.get("password");

      const {
        success,
        data,
        error: signInError,
      } = await signInUser(email, password);

      if (signInError) {
        return new Error(signInError);
      }

      if (success && data?.session) {
        // navigate to /dashboard
        navigate("/dashboard");
        return null;
      }
      return null;
    },
    null // InitalState
  );

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
            Don't have an account yet? {/*<Link className="form-link">*/}
            <Link className="form-link" to="/signup">Sign up</Link>
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
            aria-describedby={error ? "signin-error" : undefined}
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
            aria-describedby={error ? "signin-error" : undefined}
            disabled={isPending}
          />

          <button
            type="submit"
            className="form-button"
            //className=
            //aria-busy=
          >
            {/*'Signing in...' when pending*/}
            {isPending ? "Signing in..." : "Sign In"}
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
