import { useEffect, useRef } from "react";

const GSI_SRC = "https://accounts.google.com/gsi/client";
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

let gsiPromise;
const loadGsi = () => {
  gsiPromise ??= new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) return resolve();
    const script = document.createElement("script");
    script.src = GSI_SRC;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => {
      gsiPromise = undefined;
      reject(new Error("Could not load Google sign-in"));
    };
    document.head.appendChild(script);
  });
  return gsiPromise;
};

/**
 * Official Google Identity Services button. Google returns a signed ID token
 * (`credential`), which the server verifies; the browser never asserts who the user is.
 */
const GoogleSignInButton = ({ onCredential, disabled = false }) => {
  const containerRef = useRef(null);
  const callbackRef = useRef(onCredential);

  // Keep the latest handler without re-initialising Google's button.
  useEffect(() => {
    callbackRef.current = onCredential;
  }, [onCredential]);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return undefined;
    let cancelled = false;

    loadGsi()
      .then(() => {
        if (cancelled || !containerRef.current) return;
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response) => callbackRef.current(response.credential),
        });
        window.google.accounts.id.renderButton(containerRef.current, {
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          width: containerRef.current.offsetWidth || 400,
        });
      })
      .catch((err) => console.error(err.message));

    return () => {
      cancelled = true;
    };
  }, []);

  if (!GOOGLE_CLIENT_ID) return null;

  return (
    <div
      ref={containerRef}
      aria-busy={disabled}
      className={`flex min-h-10 w-full justify-center ${disabled ? "pointer-events-none opacity-60" : ""}`}
    />
  );
};

export default GoogleSignInButton;
