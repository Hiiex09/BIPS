import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useLogin, useGoogleLogin } from "../hooks/UseAuthRouteHooks";
import AuthShell from "../components/public/AuthShell";
import GoogleSignInButton, { GOOGLE_CLIENT_ID } from "../components/public/GoogleSignInButton";
import { HALL } from "../data/hall";

const fieldClass =
  "input field";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useLogin();
  const { mutate: googleMutate, isPending: isGooglePending } = useGoogleLogin();
  const busy = isPending || isGooglePending;

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ email, password });
  };

  // Google returns a signed ID token; the server verifies it before signing anyone in.
  const handleGoogleCredential = (credential) => googleMutate({ credential });

  return (
    <AuthShell
      title="Log in to your account"
      intro="Use the email you registered with the barangay portal."
      footnote="By logging in, you agree to the portal's Terms of Service and Privacy Policy."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="login-email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            required
            placeholder="juan.delacruz@example.com"
            className={`${fieldClass} mt-1.5`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="login-password" className="text-sm font-semibold">
              Password
            </label>
            <a href={`mailto:${HALL.email}?subject=Password%20reset`} className="link-ink text-sm">
              Forgot password?
            </a>
          </div>
          <div className={`${fieldClass} mt-1.5 flex items-center gap-2 pr-1.5`}>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              className="grow bg-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-ghost btn-xs btn-square text-base-content/60 hover:text-base-content"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-base-content/70">
          <input type="checkbox" className="checkbox checkbox-sm checkbox-primary rounded" />
          Keep me logged in on this device
        </label>

        <button type="submit" disabled={busy} className="btn-stamp w-full">
          {isPending ? "Logging in…" : "Log in"}
        </button>
      </form>

      {GOOGLE_CLIENT_ID && (
        <>
          <div className="my-6 flex items-center gap-3 text-sm text-base-content/50">
            <span className="h-px flex-1 bg-base-300" />
            or
            <span className="h-px flex-1 bg-base-300" />
          </div>
          <GoogleSignInButton onCredential={handleGoogleCredential} disabled={busy} />
        </>
      )}

      <p className="mt-6 text-sm text-base-content/70">
        New to the portal?{" "}
        <Link to="/signup" className="link-ink font-semibold text-base-content">
          Register as a resident
        </Link>
      </p>
    </AuthShell>
  );
};

export default Login;
